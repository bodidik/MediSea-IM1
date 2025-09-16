use client;

import React from react;

function drawWrappedText(ctx CanvasRenderingContext2D, text string, x number, y number, maxWidth number, lineHeight number) {
  const words = text.split(s+);
  let line = ;
  for (let n = 0; n  words.length; n++) {
    const testLine = line + words[n] +  ;
    const metrics = ctx.measureText(testLine);
    if (metrics.width  maxWidth && n  0) {
      ctx.fillText(line, x, y);
      line = words[n] +  ;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function tileWatermark(ctx CanvasRenderingContext2D, w number, h number, text string) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.translate(w  2, h  2);
  ctx.rotate(-Math.PI  6);
  ctx.textAlign = center;
  ctx.textBaseline = middle;
  ctx.font = 16px sans-serif;
  const step = 200;
  for (let y = -h; y  h; y += step) {
    for (let x = -w; x  w; x += step) {
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();
}

export default function ProtectedContent({ chunkId = sample } { chunkId string }) {
  const ref = React.useRefHTMLCanvasElement(null);
  const [err, setErr] = React.useStatestring  null(null);
  const [loading, setLoading] = React.useState(false);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`apiprotectedchunkid=${encodeURIComponent(chunkId)}`, { cache no-store });
      const j = await r.json();
      if (!r.ok  !j.ok) throw new Error(j.error  fetch_fail);
      const canvas = ref.current!;
      const dpi = Math.min(window.devicePixelRatio  1, 2);
      const W = Math.min(900, window.innerWidth - 32);
      const H = 300;  basit bir alan; istersen dinamik ölç
      canvas.width = Math.floor(W  dpi);
      canvas.height = Math.floor(H  dpi);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext(2d)!;
      ctx.scale(dpi, dpi);

       Arkaplan
      ctx.fillStyle = #fff;
      ctx.fillRect(0, 0, W, H);

       Watermark
      const cookie = document.cookie.match((^; )mk_uid=([^;]+));
      const uid = cookie.[1]  anon;
      tileWatermark(ctx, W, H, `${uid} • Medknowledge`);

       İçerik
      ctx.fillStyle = #111;
      ctx.font = 15px system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      drawWrappedText(ctx, j.chunk.content, 16, 28, W - 32, 22);

    } catch (e any) {
      setErr(e.message  ERR);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() = {
    load();
     kopya & sağ tık engelleri
    const stop = (ev Event) = ev.preventDefault();
    document.addEventListener(copy, stop);
    document.addEventListener(cut, stop);
    document.addEventListener(contextmenu, stop);
    document.addEventListener(selectstart, stop);
    return () = {
      document.removeEventListener(copy, stop);
      document.removeEventListener(cut, stop);
      document.removeEventListener(contextmenu, stop);
      document.removeEventListener(selectstart, stop);
    };
  }, [chunkId]);

  return (
    div className=rounded-2xl border p-4
      div className=text-sm mb-2🔒 Korumalı Alan (Premium)div
      {err && div className=text-sm text-red-600{err}div}
      canvas ref={ref} 
      div className=mt-3
        button onClick={load} disabled={loading} className=px-3 py-2 rounded-lg border text-sm
          {loading  Yükleniyor…  Yenile}
        button
      div

      { Yazdırmayı kapat }
      style jsx global{`
        @media print { body { display none !important; } }
        canvas { user-select none; -webkit-user-select none; }
      `}style
    div
  );
}
