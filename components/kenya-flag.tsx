export function KenyaFlag() {
  return (
    <div className="relative w-8 h-6 overflow-hidden rounded-sm">
      <div className="w-full h-full grid grid-rows-4">
        <div className="bg-black" />
        <div className="bg-[#BB0000]" />
        <div className="bg-[#006600]" />
        <div className="bg-white" />
      </div>

      {/* Maasai Shield */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-[url('/kenya-shield.svg')] bg-contain bg-no-repeat bg-center" />
      </div>

      {/* Crossed Spears */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <div className="absolute w-0.5 h-6 bg-[#D4AF37] rotate-45 transform origin-center" />
          <div className="absolute w-0.5 h-6 bg-[#D4AF37] -rotate-45 transform origin-center" />
        </div>
      </div>
    </div>
  )
}

