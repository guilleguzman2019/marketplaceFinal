"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Heart, Eye, ShoppingCart } from "lucide-react";



// Datos de ejemplo (puedes reemplazarlos con props o fetch desde la API)
const products = [
  {
    id: 1,
    title: "Licuadora KANJIHOM USB Portátil Azul-Amar",
    vendor: "PETENATTI HOGAR VC",
    price: 24287,
    cuotas: "Hasta 12 cuotas sin interés de $ 2.023,91",
    precioSinImp: "$ 20.702",
    img: "https://viamarket.vtexassets.com/arquivos/ids/7484251-185-185?v=638881026480730000&width=185&height=185&aspect=true",
  },
  {
    id: 2,
    title: "Termo Discovery Verde Acero Inoxidable",
    vendor: "DRTECHINSUMOS",
    price: 39999.99,
    cuotas: "Hasta 12 cuotas sin interés de $ 3.333,33",
    precioSinImp: "$ 33.058",
    img: "https://viamarket.vtexassets.com/arquivos/ids/3333193-185-185?v=638895815266370000&width=185&height=185&aspect=true",
    discount: "-9%",
  },
  {
    id: 3,
    title: "Exprimidor Liliana AE940N Automático",
    vendor: "PETENATTI HOGAR VC",
    price: 43466,
    cuotas: "Hasta 12 cuotas sin interés de $ 3.622,16",
    precioSinImp: "$ 35.922",
    img: "https://viamarket.vtexassets.com/arquivos/ids/3411095-185-185?v=638815257537170000&width=185&height=185&aspect=true",
  },
  {
    id: 4,
    title: "Mini Multiprocesadora Liliana AMI 5 en 1",
    vendor: "PETENATTI HOGAR VC",
    price: 121704,
    cuotas: "Hasta 12 cuotas sin interés de $ 10.142",
    precioSinImp: "$ 100.582",
    img: "https://viamarket.vtexassets.com/arquivos/ids/3335409-185-185?v=638814914057630000&width=185&height=185&aspect=true",
  },
  {
    id: 5,
    title: "Pava Liliana AP990R Retrostyle Roja",
    vendor: "PETENATTI HOGAR VC",
    price: 78238,
    cuotas: "Hasta 12 cuotas sin interés de $ 6.519,83",
    precioSinImp: "$ 64.680",
    img: "https://viamarket.vtexassets.com/arquivos/ids/3409712-185-185?v=638815251860600000&width=185&height=185&aspect=true",
  },
];

export default function Htas() {
  return (
    <section className="px-6 py-8">
      {/* Encabezado */}
      <div className="flex items-center gap-6 mb-6">
        <h2 className="text-lg font-bold">Herramientas</h2>
        <a href="#" className="text-[#394eaa] font-semibold hover:underline">
          Ver más
        </a>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="border border-gray-200 shadow-lg bg-white p-4 flex flex-col">
              {/* Imagen + acciones */}
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-48 object-contain"
                />
                <div className="absolute top-1 right-1 flex gap-2">
                  <button className="p-1 bg-white  hover:bg-gray-100 rounded-full">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 bg-white  hover:bg-gray-100 rounded-full">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {p.discount && (
                  <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {p.discount}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 mt-3 text-sm">
                <p className="text-gray-500">
                  Vendido por:{" "}
                  <span className="text-[#394eaa] font-medium mb-3">{p.vendor}</span>
                </p>
                <p className="line-clamp-2 mt-1">{p.title}</p>
              </div>

              {/* Precio */}
              <div className="mt-2">
                <p className="text-[#394eaa] font-bold text-lg">
                  ${p.price.toLocaleString("es-AR")}
                </p>
                <p className="text-xs text-gray-500">{p.cuotas}</p>
              </div>

              {/* Botón */}
              <button className="mt-3 bg-[#394eaa] text-white py-2 rounded-lg hover:bg-gray-700 flex gap-3 px-4 items-center">
                <ShoppingCart/>
                <span className="text-[12px]">Agregar al Carrito</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
