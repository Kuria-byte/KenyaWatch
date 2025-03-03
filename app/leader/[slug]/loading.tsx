export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-[300px] bg-gray-200 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="h-[400px] bg-gray-200 rounded-lg" />
      </div>
    </div>
  )
}