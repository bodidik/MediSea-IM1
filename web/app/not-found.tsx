// FILE: web/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Sayfa bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığınız sayfayı bulamadık. Üst menüden bölümlere, araçlara veya ana sayfaya dönebilirsiniz.
        </p>
        <a href="/" className="inline-block px-4 py-2 rounded-lg border hover:bg-gray-50">Ana sayfa</a>
      </div>
    </div>
  );
}
