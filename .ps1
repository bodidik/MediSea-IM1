# Proje kök dizini
$projectRoot = "C:\Users\hucig\Medknowledge"

# Masaüstüne çıktı dosyası
$reportPath = [Environment]::GetFolderPath("Desktop") + "\proje-durumu.txt"
Clear-Content $reportPath -ErrorAction SilentlyContinue

# 1. Ana klasörlerin varlığını kontrol et
$expectedFolders = @("server", "web", "server/controllers", "server/models", "server/routes", "web/public", "web/src")
Add-Content $reportPath "📁 Klasör Kontrolü:`n"
foreach ($folder in $expectedFolders) {
    $fullPath = Join-Path $projectRoot $folder
    if (Test-Path $fullPath) {
        Add-Content $reportPath "✅ $folder mevcut"
    } else {
        Add-Content $reportPath "❌ $folder eksik"
    }
}

# 2. Port tanımlarını ara
Add-Content $reportPath "`n🔌 Port Tanımları:`n"
Get-ChildItem -Path "$projectRoot\server" -Recurse -Include *.js,*.ts | Select-String -Pattern "port" | ForEach-Object {
    Add-Content $reportPath $_.Line
}

# 3. Git durumu kontrolü
Add-Content $reportPath "`n🔁 Git Durumu:`n"
Set-Location $projectRoot
$gitStatus = git status
Add-Content $reportPath $gitStatus

$unpushedCommits = git log origin/main..HEAD --oneline
if ($unpushedCommits) {
    Add-Content $reportPath "`n🚀 Push edilmemiş commit'ler:`n$unpushedCommits"
} else {
    Add-Content $reportPath "`n✅ Tüm commit'ler GitHub ile senkronize"
}

# 4. Özet
Add-Content $reportPath "`n🧾 Rapor tamamlandı: $reportPath"
notepad $reportPath