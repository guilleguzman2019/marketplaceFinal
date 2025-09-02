

"use client";

import { useState } from "react";
import { Search, User, Heart, ShoppingCart, X, LogOut, Plus, Menu, ChevronDown } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const { data: session } = useSession();
  const { items, getTotal, getItemCount } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = () => {
    signIn();
    setIsLoginOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="w-full">
      {/* Barra superior */}
      <div className="hidden md:flex justify-between items-center px-12 py-2 text-xs bg-white"> <div className="flex items-center gap-2"> <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/svgs/icon-caja-black___5eeefa9b54fcad28ac9338eadf8db6aa.svg" alt="" /> <span className="text-gray-700"> Sin costo de envío en tus pedidos </span> </div> <div className="flex items-center gap-2"> <img className="w-5 h-5" src="https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/a2c9c6cf-46d5-424a-8bed-2dd8622a62dd___243b6fce3692e2e024cb3638daf906a7.png" alt="" /> <span className="text-gray-700">Cuotas en todas tus compras</span> </div> <div className="flex items-center gap-2"> <img className="w-5 h-5" src="https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/2f3fa28c-941f-4b6d-a10a-a9a2e8d9a6e2___7f63d5fec17b9625bd71db2d0d6a4d04.png" alt="" /> <span className="text-gray-700"> Ofertas y promociones de todas las marcas </span> </div> <div className="flex items-center gap-2"> <img src="https://viamarket.vtexassets.com/assets/vtex/assets-builder/viamarket.viamarket-theme/2.0.84/svgs/icon-devolucion-black___953e3b70a39fd5c52a564b8b01b7ed56.svg" alt="" /> <span className="text-gray-700">Logística propia Correo</span> </div> </div>

      {/* Barra principal */}
      <div className="bg-[#394eaa] px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between text-white gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img
              className="w-40 sm:w-48 md:w-60 h-auto"
              src="https://i.postimg.cc/Vv8x350C/COMPRAS.png"
              alt=""
            />
          </a>
        </div>

        {/* Navegación */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              Categorías
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/categories" className="block px-4 py-2 hover:bg-gray-100">
                Ver todas las categorías
              </a>
              <div className="border-t my-1"></div>
              <a href="/category/electronics" className="block px-4 py-2 hover:bg-gray-100">
                Electrónicos
              </a>
              <a href="/category/home" className="block px-4 py-2 hover:bg-gray-100">
                Hogar y Jardín
              </a>
              <a href="/category/sports" className="block px-4 py-2 hover:bg-gray-100">
                Deportes
              </a>
              <a href="/category/fashion" className="block px-4 py-2 hover:bg-gray-100">
                Moda
              </a>
              <a href="/category/books" className="block px-4 py-2 hover:bg-gray-100">
                Libros
              </a>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 px-4 py-2 text-gray-700 outline-none"
            />
            <button className="p-2 mx-1 rounded">
              <Search className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>

        {/* Iconos */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Iniciar sesión / Usuario */}
          {session ? (
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="flex items-center gap-1 hover:text-gray-200"
              >
                <User className="w-9 h-9" />
                <span className="hidden md:block text-[13px] leading-tight">
                  {(session.user.name || "Mi Cuenta")
                    .split(" ")
                    .map((word, index) => (
                      <span key={index} className="block">{word}</span>
                    ))}
                </span>
              </a>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1"
            >
              <User className="w-9 h-9" />
              <span className="hidden md:block text-[13px]">
                Iniciar <br /> Sesión
              </span>
            </button>
          )}

          {/* Favoritos */}
          <button className="flex items-center gap-1">
            <Heart className="w-9 h-9" />
            <span className="hidden md:block text-[13px] mt-1">Favoritos</span>
          </button>

          {/* Carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2"
          >
            <ShoppingCart className="w-8 h-8" />
            <span className="hidden md:block text-[13px]">
              ${getTotal().toLocaleString("es-AR")}
            </span>
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-1">
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <div className="px-4 py-2 space-y-2">
            <a href="/products" className="block py-2 text-gray-700 hover:text-[#394eaa]">
              Productos
            </a>
            <a href="/categories" className="block py-2 text-gray-700 hover:text-[#394eaa]">
              Categorías
            </a>
          </div>
        </div>
      )}

      {/* Drawer del carrito */}
      {isCartOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="absolute inset-0 bg-[#0000008c] bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm h-full bg-white shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center pb-2 mb-4">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-gray-600">No tienes productos en el carrito.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-gray-600 text-xs">{item.vendor}</p>
                        <p className="text-[#394eaa] font-bold">
                          ${item.price.toLocaleString("es-AR")} x {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => useCartStore.getState().removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <button className="w-full bg-[#394eaa] text-white py-2 rounded-md">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer de login */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex justify-start z-50">
          <div
            className="absolute inset-0 bg-[#0000008c] bg-opacity-50"
            onClick={() => setIsLoginOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm h-full bg-white shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center pb-2 mb-4">
              <h2 className="text-lg font-semibold">¡Te damos la bienvenida!</h2>
              <button onClick={() => setIsLoginOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Elegí cómo querés ingresar
            </p>

            <button 
              onClick={handleSignIn}
              className="w-full border border-[#394eaa] text-[#394eaa] py-2 rounded-md mb-3"
            >
              INICIAR CON EMAIL
            </button>
            <button 
              onClick={handleSignIn}
              className="w-full border border-[#394eaa] text-[#394eaa] py-2 rounded-md flex items-center justify-center gap-2"
            >
              <img
                src='https://img.icons8.com/color/512/google-logo.png'
                alt="Google"
                className="w-5 h-5"
              />
              ENTRAR CON <strong>GOOGLE</strong>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
