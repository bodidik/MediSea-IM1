#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
    [int[]]$PortCandidates = @(3000, 3001, 3002)
)

function Get-PidsOnPort {
    param([int]$Port)
    $pids = @()

    # Windows 10/11 modern API
    if (Get-Command Get-NetTCPConnection -ErrorAction SilentlyContinue) {
        $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
        if ($conns) {
            $owners = $conns | ForEach-Object {
                try { (Get-Process -Id $_.OwningProcess -ErrorAction Stop).Id } catch { $null }
            } | Where-Object { $_ -ne $null }
            if ($owners) { $pids += $owners | Select-Object -Unique }
        }
    }

    # Fallback: netstat
    if (-not $pids -or $pids.Count -eq 0) {
        $lines = netstat -aon | Select-String -SimpleMatch (":" + $Port)
        if ($lines) {
            foreach ($l in $lines) {
                $txt = $l.ToString()
                $parts = $txt -split "\s+"
                if ($parts.Length -gt 0) {
                    $candidate = $parts[$parts.Length - 1]
                    if ($candidate -match '^\d+$' -and -not ($pids -contains $candidate)) {
                        $pids += [int]$candidate
                    }
                }
            }
        }
    }

    # HER ZAMAN dizi döndür
    return @($pids | Select-Object -Unique)
}

function Test-PortBusy {
    param([int]$Port)
    $pids = Get-PidsOnPort -Port $Port
    if (-not $pids -or $pids.Count -eq 0) { return $false }
    return $true
}

function Kill-PortPids {
    param([int]$Port)
    $pids = Get-PidsOnPort -Port $Port
    if ($pids.Count -eq 0) { return $false }

    Write-Host ("Port {0} is used by PID(s): {1}. Killing..." -f $Port, ($pids -join ", "))
    foreach ($procId in $pids) {
        try {
            taskkill /PID $procId /F | Out-Null
            Write-Host ("Killed PID {0}" -f $procId)
        } catch {
            Write-Host ("Could not kill PID {0}: {1}" -f $procId, $_.Exception.Message)
        }
    }
    Start-Sleep -Seconds 2
    return $true
}

# Çalışma klasörü ve env
Set-Location "C:\Users\hucig\Medknowledge\web"
$env:NEXT_DISABLE_TRACE = "1"

$chosen = $null
foreach ($p in $PortCandidates) {
    Write-Host ("Checking port {0}..." -f $p)
    if (Test-PortBusy -Port $p) {
        Kill-PortPids -Port $p | Out-Null
        if (Test-PortBusy -Port $p) {
            Write-Host ("Port {0} is still busy. Trying next..." -f $p)
            continue
        }
    }
    $chosen = $p
    break
}

if ($null -eq $chosen) {
    Write-Host ("No free port found in list: {0}" -f ($PortCandidates -join ", "))
    exit 1
}

Write-Host ("Starting Next.js on port {0}..." -f $chosen)
npm run dev -- -p $chosen
