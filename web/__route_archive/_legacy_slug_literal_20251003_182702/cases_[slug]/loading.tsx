// FILE: web/app/cases/[slug]/loading.tsx
export default function LoadingCase() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded" />
      <div className="h-8 w-1/2 bg-gray-200 rounded mt-3" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
        <div className="lg:col-span-4 space-y-3">
          <div className="h-40 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}


