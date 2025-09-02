"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBagIcon,
  UserIcon,
  HomeIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);

  // step actual: 0 = Bolsa, 1 = Datos, 2 = Entrega, 3 = Pago
  const currentStep = 0;
  const steps = [
    { label: "Bolsa", Icon: ShoppingBagIcon },
    { label: "Datos", Icon: UserIcon },
    { label: "Entrega", Icon: HomeIcon },
    { label: "Pago", Icon: CreditCardIcon },
  ];

  return (
    <div className="flex-1 bg-gray-50 px-6 py-8">
      {/* STEP INDICATOR */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center">
          {steps.map(({ label, Icon }, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;

            return (
              <div key={label} className="flex items-center">
                {/* Paso */}
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isCompleted || isCurrent
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-400 border border-gray-300",
                    ].join(" ")}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={[
                      "mt-1 text-sm text-center",
                      isCurrent
                        ? "text-green-700 font-semibold"
                        : "text-gray-400",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </div>

                {/* Conector */}
                {i !== steps.length - 1 && (
                  <div
                    className={[
                      "w-12 sm:w-14 md:w-40 h-1 mx-2 md:mx-4 rounded-full",
                      i < currentStep ? "bg-green-600" : "bg-gray-200",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 bg-white shadow rounded-xl p-4">
        {/* Encabezado */}
        <div className="grid grid-cols-6 text-gray-800 font-semibold mb-4 px-4">
          <span className="col-span-3">Producto</span>
          <span className="col-span-2 text-center">Cantidad</span>
          <span className="col-span-1 text-right">Precio</span>
        </div>

        {/* Fila de producto */}
        <div className="grid grid-cols-6 items-center pt-4 gap-4">
          {/* Columna Producto (ocupa 3/6) */}
          <div className="col-span-3 flex items-center gap-4">
            <Image
              src="https://viamarket.vtexassets.com/arquivos/ids/7525360-800-auto?v=638920895383600000&width=200&height=auto&aspect=true"
              alt="Producto"
              width={90}
              height={90}
              className="rounded-md"
            />
            <div>
              <h3 className="text-[13px] text-gray-800">
                FREIDORA WESTINGHOUSE AF-2201 DE AIRE DIGITAL 12LTS
              </h3>
              <p className="text-sm text-gray-500">
                Vendido y enviado por: Petenatti Hogar VC
              </p>
            </div>
          </div>

          {/* Columna Cantidad (ocupa 2/6) */}
          <div className="col-span-2 flex justify-center">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Columna Precio (ocupa 1/6) */}
          <div className="col-span-1 text-right">
            <p className="text-lg font-semibold text-gray-800">$192.177</p>
          </div>
        </div>

      </div>

        {/* Resumen de compra */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Entrega</h2>
          <p className="text-sm text-gray-600 mb-4">
            Vea todas las opciones de envío para sus productos, incluyendo los
            plazos y los precios de envío
          </p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-6 py-2 rounded-md border mb-6">
            CALCULAR
          </button>

          <div className=" pt-4">
            <p className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>$192.177</span>
            </p>
            <p className="flex justify-between font-semibold text-lg text-gray-800 mt-2">
              <span>Total</span>
              <span>$192.177</span>
            </p>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg mt-6 font-medium">
            Finalizar compra
          </button>
        </div>

      </div>

    </div>
  );
}
