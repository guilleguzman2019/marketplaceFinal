"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import {ShoppingCart } from "lucide-react";

export default function Ofertas() {
  // Estado para el countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 17,
    seconds: 39,
  });

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const productos = [
    {
      id: 1,
      vendedor: "PARDO",
      titulo: "Escritorio + Silla One Box Ajustable OB-ES14 Kids",
      precio: 227399,
      cuotas: 75799.66,
      precioSinImp: 187933,
      img: "https://viamarket.vtexassets.com/arquivos/ids/7198415-185-185?v=638862981432400000&width=185&height=185&aspect=true",
    },
    {
      id: 2,
      vendedor: "ESPACIO682",
      titulo: "Sillón SKARPO doble color NEGRO",
      precio: 218489,
      descuento: 18,
      precioOriginal: 264999,
      precioSinImp: 180569,
      img: "https://viamarket.vtexassets.com/arquivos/ids/217208-185-185?v=638710966628470000&width=185&height=185&aspect=true",
    },
    {
      id: 3,
      vendedor: "ESPACIO682",
      titulo: "Sillón ROCCO Negro",
      precio: 134539,
      descuento: 16,
      precioOriginal: 150999,
      precioSinImp: 111189,
      img: "https://viamarket.vtexassets.com/arquivos/ids/217165-185-185?v=638710966561030000&width=185&height=185&aspect=true",
    },
  ];

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 mx-3">IMPERDIBLES</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Countdown */}
          <div className="border p-4 rounded-lg shadow flex flex-col gap-4 items-center justify-center text-center h-full">
            <h3 className="text-2xl font-bold mb-2">
              ¡APROVECHÁ ESTAS OFERTAS!
            </h3>
            <button className="bg-[#394eaa] text-white px-3 py-1 rounded text-base mb-3">
              DESCUENTOS IMPERDIBLES
            </button>
            <p className="mb-2">¡Estás a tiempo! Quedan:</p>
            <div className="flex justify-center space-x-2 text-xl font-bold">
              <div className="px-2 py-1 bg-gray-100 rounded">
                {String(timeLeft.hours).padStart(2, "0")}{" "}
                <span className="text-sm">hs</span>
              </div>
              <div className="px-2 py-1 bg-gray-100 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}{" "}
                <span className="text-sm">min</span>
              </div>
              <div className="px-2 py-1 bg-gray-100 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}{" "}
                <span className="text-sm">seg</span>
              </div>
            </div>
          </div>

          {/* Swiper con productos */}
          <div className="col-span-3">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {productos.map((prod) => (
                <SwiperSlide key={prod.id}>
                  <div className="border border-gray-300 rounded-lg p-4 !h-[460px] shadow hover:shadow-lg transition h-full flex flex-col">
                    <img
                      src={prod.img}
                      alt={prod.titulo}
                      className="w-full h-40 object-contain mb-2"
                    />
                    <p className="text-sm text-gray-500 mb-2">
                      Vendido por:{" "}
                      <span className="font-semibold">{prod.vendedor}</span>
                    </p>
                    <h3 className="text-md font-semibold mb-2">{prod.titulo}</h3>

                    {prod.descuento && (
                      <p className="text-red-600 font-bold">
                        -{prod.descuento}%{" "}
                        <span className="line-through text-gray-400">
                          ${prod.precioOriginal.toLocaleString("es-AR")}
                        </span>
                      </p>
                    )}

                    <p className="text-blue-600 text-xl font-bold">
                      ${prod.precio.toLocaleString("es-AR")}
                    </p>

                    {prod.cuotas && (
                      <p className="text-sm text-gray-500">
                        Hasta 3 cuotas sin interés de $
                        {prod.cuotas.toLocaleString("es-AR")}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Precio sin impuestos nacionales: $
                      {prod.precioSinImp.toLocaleString("es-AR")}
                    </p>

                    {/* Botón siempre al fondo */}
                    <button className="flex items-center gap-4 mx-auto bg-[#394eaa] px-6 w-full mt-auto py-2 rounded text-white font-semibold hover:bg-gray-700">
                      <ShoppingCart/>
                      <span className="text-[15px]">Agregar al Carrito</span>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
