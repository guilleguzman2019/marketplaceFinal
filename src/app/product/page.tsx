"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen del producto */}
        <div className="flex justify-center">
          <img
            src="https://viamarket.vtexassets.com/arquivos/ids/7525360-800-auto?v=638920895383600000&width=800&height=auto&aspect=true"
            alt="Procesadora Philips"
          />
        </div>

        {/* Info del producto */}
        <div className="flex flex-col gap-4 px-9">
          <h1 className="text-2xl font-bold text-gray-800">
            PROCESADORA PHILIPS HR7304/90 750W 2V
          </h1>
          <p className="text-gray-500 text-sm">Vendido por: <span className="text-[#394eaa]"> Petenatti Hogar VC</span></p>

          <p className="text-3xl font-semibold text-[#394eaa]">$283.935</p>
          <p className="text-sm text-gray-500">
            Precio sin impuestos nacionales:{" "}
            <span className="font-medium">$234.657</span>
          </p>

          {/* Color */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Color:</p>
            <div className="border-2 border-[#394eaa] rounded-lg w-16 h-16 flex items-center justify-center">
              <Image
                src="https://viamarket.vtexassets.com/arquivos/ids/7525360-800-auto?v=638920895383600000&width=800&height=auto&aspect=true"
                alt="Color"
                width={50}
                height={50}
              />
            </div>
          </div>

          {/* Promociones */}
          <div className="mt-4">
            <p className="font-medium text-gray-700">
              ¡Nuestras promociones bancarias!
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                9 cuotas sin interés de{" "}
                <span className="text-green-700 font-semibold">
                  $31.548,33
                </span>
              </li>
              <li>
                12 cuotas sin interés de{" "}
                <span className="text-green-700 font-semibold">
                  $23.661,25
                </span>
              </li>
            </ul>
          </div>

          {/* Cantidad y carrito */}
          <div className="mt-6">
            <p className="text-sm text-gray-700 font-medium mb-1">Cantidad</p>
            <div className="flex items-center gap-3">
              {/* Selector de cantidad */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              {/* Botón agregar al carrito */}
              <button className="flex-1 bg-[#394eaa] hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold text-sm shadow">
                AGREGAR AL CARRITO
              </button>
          </div>

            {/* Código postal */}
          <div className="mt-4">
  <p className="text-sm text-gray-700 font-medium mb-1">Código postal</p>
  <div className="flex mt-2 gap-2">
    <input
      type="text"
      placeholder="Ingrese código postal"
      className="border rounded-md px-4 py-2 text-sm flex-1"
    />
    <button className="bg-gray-100 text-gray-500 text-[13px] rounded-md py-2 border hover:bg-gray-200 flex-1">
      CALCULAR ENVÍO
    </button>
  </div>
</div>

          </div>

        </div>
      </div>

      {/* NUEVA SECCIÓN: descripción izquierda, opciones adicionales derecha */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10  pt-8">
        {/* Columna izquierda: Descripción */}
        <div>
          <h2 className="text-lg font-semibold text-[#394eaa]">Descripción</h2>
          <p className="mt-4 text-gray-700 font-medium">
            PROCESADORA PHILIPS HR7304/90 750W 2V
          </p>
          <div className="mt-2 text-gray-600 space-y-4 text-sm leading-relaxed">
            <p>
              Philips es una empresa enfocada desde hace más de 120 años en
              mejorar la calidad de vida de las personas a través de productos
              innovadores y actuales. Tu experiencia de cocinar será totalmente
              diferente y placentera gracias a esta multiprocesadora.
            </p>
            <p>
              <strong>Como un chef profesional</strong>
              <br />
              ¡Abrí el libro de recetas y poné manos a la obra! Lograrás tener
              resueltos tus almuerzos y cenas en pocos pasos y sin limitaciones.
            </p>
            <p>
              <strong>Libre de BPA</strong>
              <br />
              A sus beneficios se le suma que no contiene Bisfenol, por lo que
              podrás tener la tranquilidad de que el material de sus componentes
              es seguro. Tus comidas y bebidas no estarán en contacto con esta
              sustancia que puede ser perjudicial.
            </p>
          </div>
        </div>

        {/* Columna derecha: Opciones adicionales + Compartir */}
        <div>
          {/* Opciones adicionales */}
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <img
                src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/svgs/icon-envio-gratis-pdp___b2e9e03e28e6fe7f89be4c0cb9b2e782.svg"
                alt=""
              />
              <p>
                <strong>Logística por Correo</strong> – Sin costo de envío
                en tus pedidos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/svgs/icon-recogida-pdp___77ed11a3f5a1b23313a756354ef593ed.svg"
                alt=""
              />
              <p>
                <strong>Retiro en sucursales</strong> – Comprá y retiralo sin
                cargo en nuestras sucursales
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-auto"
                src="https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/55b705d7-4b24-4373-b22a-df454ea7e0b6___9dd7ec3cbfc4d634054883cba27f0271.png"
                alt=""
              />
              <p>
                <strong>Compra protegida</strong> – Equipo de soporte y atención
                a clientes
              </p>
            </div>
          </div>

          {/* Compartir */}
          <div className="mt-6">
            <p className="text-gray-700 font-medium">Comparte</p>
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                className="bg-green-500 text-white px-3 py-2 rounded-full text-sm"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
