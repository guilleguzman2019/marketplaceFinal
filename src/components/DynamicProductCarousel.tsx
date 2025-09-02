"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Heart, Eye, ShoppingCart } from "lucide-react";
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
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

export default function DynamicProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=10');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
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
      <section className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-lg font-bold">ÚLTIMOS INGRESOS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-200 shadow-lg bg-white p-4 animate-pulse">
              <div className="bg-gray-200 h-48 mb-3"></div>
              <div className="bg-gray-200 h-4 mb-2"></div>
              <div className="bg-gray-200 h-4 mb-2"></div>
              <div className="bg-gray-200 h-6 mb-3"></div>
              <div className="bg-gray-200 h-8"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-6 sm:py-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 mb-4 sm:mb-6">
        <h2 className="text-lg font-bold">ÚLTIMOS INGRESOS</h2>
        <a href="/products" className="text-[#394eaa] text-sm sm:text-base font-semibold hover:underline">
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
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => {
          const images = JSON.parse(product.images);
          const discount = product.discount || 0;
          
          return (
            <SwiperSlide key={product.id}>
              <div className="border border-gray-200 shadow-lg bg-white p-3 sm:p-4 flex flex-col h-[330px] sm:h-[350px]">
                {/* Imagen + acciones */}
                <div className="relative">
                  <a href={`/product/${product.id}`}>
                    <img
                      src={images[0] || ''}
                      alt={product.title}
                      className="w-full h-24 sm:h-28 object-contain hover:scale-105 transition-transform"
                    />
                  </a>
                  <div className="absolute top-1 right-1 flex gap-2">
                    <a href={`/product/${product.id}`} className="p-1 bg-white hover:bg-gray-100 rounded-full">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </a>
                    <button className="p-1 bg-white hover:bg-gray-100 rounded-full">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {discount > 0 && (
                    <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 mt-3 text-sm">
                  <p className="text-gray-500">
                    Vendido por:{" "}
                    <span className="text-[#394eaa] font-medium mb-3">{product.vendor}</span>
                  </p>
                  <a href={`/product/${product.id}`}>
                    <p className="line-clamp-2 mt-1 hover:text-[#394eaa] transition-colors">{product.title}</p>
                  </a>
                </div>

                {/* Precio */}
                <div className="mt-2">
                  <p className="text-[#394eaa] font-bold text-lg">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString("es-AR")}
                    </p>
                  )}
                </div>

                {/* Botón */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 bg-[#394eaa] text-white py-2 rounded-lg hover:bg-gray-700 flex gap-3 px-4 items-center"
                >
                  <ShoppingCart/>
                  <span className="text-[12px]">Agregar al Carrito</span>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
