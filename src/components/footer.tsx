"use client";

import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Newsletter */}
      <div className="bg-gray-700 text-white px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-1">
        <h2 className="text-lg md:text-xl font-bold text-center md:text-left px-12">
          QUIERO RECIBIR NOVEDADES, LANZAMIENTOS DE PRODUCTOS Y PROMOCIONES
        </h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Ingresá tu mail"
            className="px-4 py-2 rounded-md text-gray-800 flex-1 md:w-64 outline-none bg-white"
          />
          <button className="bg-white text-green-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
            REGISTRARME
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="bg-[#394eaa] text-gray-200 px-9 py-10 grid grid-cols-2 md:grid-cols-6 gap-6">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
          <img
            className="w-60 h-auto"
            src="https://i.postimg.cc/Vv8x350C/COMPRAS.png"
            alt=""
          />
        </div>

        {/* Nosotros */}
        <div>
          <h4 className="font-bold mb-2 text-white">NOSOTROS</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Sobre Vía Compras</a></li>
            <li><a href="#" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        {/* Información */}
        <div>
          <h4 className="font-bold mb-2 text-white">INFORMACIÓN</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Vía Cargo</a></li>
            <li><a href="#" className="hover:underline">¿Cómo comprar?</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">Envíos y seguimiento</a></li>
          </ul>
        </div>

        {/* Categorías */}
        <div>
          <h4 className="font-bold mb-2 text-white">CATEGORÍAS</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Tecnología</a></li>
            <li><a href="#" className="hover:underline">Electrodomésticos</a></li>
            <li><a href="#" className="hover:underline">Casa y Jardín</a></li>
            <li><a href="#" className="hover:underline">Deportes y Tiempo Libre</a></li>
            <li><a href="#" className="hover:underline">Bebes y Niños</a></li>
            <li><a href="#" className="hover:underline">Salud y Belleza</a></li>
            <li><a href="#" className="hover:underline">Mascotas</a></li>
          </ul>
        </div>

        {/* Clientes */}
        <div>
          <h4 className="font-bold mb-2 text-white">CLIENTES</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Ingresar</a></li>
            <li><a href="#" className="hover:underline">Mi cuenta</a></li>
            <li>
              <button className="mt-2 border px-3 py-1 text-xs bg-gray-600 hover:bg-gray-500">
                ME ARREPENTÍ
              </button>
              <p className="text-[10px] mt-1">
                *Solicitud de cancelación de compra
              </p>
            </li>
          </ul>
        </div>

        {/* Redes y pagos */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="font-bold mb-2 text-white">SEGUINOS</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-600 rounded-full hover:bg-gray-500">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-600 rounded-full hover:bg-gray-500">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">FORMAS DE PAGO</h4>
            <div className="flex gap-2 flex-wrap">
              <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/imgs/mercado-pago-icon___bc5efc138a604e9759bdcf1c767cfc96.png" alt="Mercado Pago" className="h-6" />
              <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/imgs/visa-icon___319d778637773725106518c3d4158861.png" alt="Visa" className="h-6" />
              <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/imgs/mastercard-icon___e9080873b1f874daa4580509dca2816e.png" alt="Mastercard" className="h-6" />
              <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/svgs/icon-amex___0abc2113037969a671a6b3322b50cda1.svg" alt="Amex" className="h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-gray-400 text-xs py-4 text-center">
        © 2025 MercadoAhora - Todos los derechos reservados
      </div>
    </footer>
  );
}
