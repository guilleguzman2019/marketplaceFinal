"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  stock: number;
  images: string;
  vendor: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
  } | null;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.idProduct as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const images = JSON.parse(product.images);
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: images[0] || '',
      vendor: product.vendor,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-gray-200 h-96 rounded"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 w-3/4"></div>
                <div className="bg-gray-200 h-6 w-1/2"></div>
                <div className="bg-gray-200 h-12 w-1/3"></div>
                <div className="bg-gray-200 h-4 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
          <a href="/products" className="text-[#394eaa] hover:underline">
            Volver a productos
          </a>
        </div>
      </div>
    );
  }

  const images = JSON.parse(product.images);
  const discount = product.discount || 0;
  const priceWithoutTaxes = Math.round(product.price / 1.21); // 21% IVA
  const cuota9 = Math.round(product.price / 9);
  const cuota12 = Math.round(product.price / 12);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Imagen del producto */}
        <div className="flex justify-center">
          <img
            src={images[0] || ''}
            alt={product.title}
            className="max-w-full h-[260px] sm:h-[320px] md:h-[400px] object-contain"
          />
        </div>

        {/* Info del producto */}
        <div className="flex flex-col gap-4 px-0 md:px-9">
          <h1 className="text-2xl font-bold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm">
            Vendido por: <span className="text-[#394eaa]">{product.vendor}</span>
          </p>

          <p className="text-3xl font-semibold text-[#394eaa]">
            ${product.price.toLocaleString("es-AR")}
          </p>
          <p className="text-sm text-gray-500">
            Precio sin impuestos nacionales:{" "}
            <span className="font-medium">${priceWithoutTaxes.toLocaleString("es-AR")}</span>
          </p>

          {/* Color */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Color:</p>
            <div className="border-2 border-[#394eaa] rounded-lg w-16 h-16 flex items-center justify-center">
              <Image
                src={images[0] || ''}
                alt="Color"
                width={50}
                height={50}
                className="object-cover rounded"
              />
            </div>
          </div>

          {/* Promociones */}
          <div className="mt-2 sm:mt-4">
            <p className="font-medium text-gray-700">
              ¡Nuestras promociones bancarias!
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                9 cuotas sin interés de{" "}
                <span className="text-green-700 font-semibold">
                  ${cuota9.toLocaleString("es-AR")}
                </span>
              </li>
              <li>
                12 cuotas sin interés de{" "}
                <span className="text-green-700 font-semibold">
                  ${cuota12.toLocaleString("es-AR")}
                </span>
              </li>
            </ul>
          </div>

          {/* Cantidad y carrito */}
          <div className="mt-4 sm:mt-6">
            <p className="text-sm text-gray-700 font-medium mb-1">Cantidad</p>
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
              {/* Selector de cantidad */}
              <div className="flex items-center border rounded-md overflow-hidden w-full xs:w-auto">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>

              {/* Botón agregar al carrito */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full xs:flex-1 bg-[#394eaa] hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
              </button>
            </div>

            {/* Código postal */}
            <div className="mt-4">
              <p className="text-sm text-gray-700 font-medium mb-1">Código postal</p>
              <div className="flex flex-col sm:flex-row mt-2 gap-2">
                <input
                  type="text"
                  placeholder="Ingrese código postal"
                  className="border rounded-md px-4 py-2 text-sm flex-1"
                />
                <button className="bg-gray-100 text-gray-500 text-[13px] rounded-md py-2 border hover:bg-gray-200 sm:flex-1">
                  CALCULAR ENVÍO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NUEVA SECCIÓN: descripción izquierda, opciones adicionales derecha */}
      <div className="max-w-6xl mx-auto mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-8">
        {/* Columna izquierda: Descripción */}
        <div>
          <h2 className="text-lg font-semibold text-[#394eaa]">Descripción</h2>
          <p className="mt-4 text-gray-700 font-medium">
            {product.title}
          </p>
          <div className="mt-2 text-gray-600 space-y-4 text-sm leading-relaxed">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <>
                <p>
                  Este producto de alta calidad está diseñado para satisfacer todas tus necesidades.
                  Fabricado con los mejores materiales y siguiendo los más altos estándares de calidad.
                </p>
                <p>
                  <strong>Características destacadas</strong>
                  <br />
                  • Excelente relación calidad-precio
                  • Garantía de fábrica
                  • Envío seguro y rápido
                </p>
                <p>
                  <strong>Información adicional</strong>
                  <br />
                  Stock disponible: {product.stock} unidades
                  {product.category && (
                    <>
                      <br />
                      Categoría: {product.category.name}
                    </>
                  )}
                </p>
              </>
            )}
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
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href={`https://wa.me/?text=Mira este producto: ${product.title} - $${product.price.toLocaleString("es-AR")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-3 py-2 rounded-full text-sm hover:bg-green-600"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm hover:bg-blue-700"
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
