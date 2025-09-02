import Image from "next/image";

export default function PromoBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Banner 1 */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
        <Image
          src="https://images.fravega.com/f300/53b69a6e03c34fcafaee67ef2e9c6657.jpg.webp" // reemplaza con tu imagen
          alt="Envíos gratis"
          fill
          className="object-contain"
        />
      </div>

      {/* Banner 2 */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-white flex">
        <div className="h-full">
          <Image
            src="https://images.fravega.com/f300/fb949d1a45f0252c619112dbf850d427.jpg.webp" // reemplaza con tu imagen
            alt="Calefacción"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
