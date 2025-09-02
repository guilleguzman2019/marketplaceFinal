"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, ArrowLeft } from "lucide-react";
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
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoryResponse] = await Promise.all([
          fetch(`/api/products?category=${categoryId}`),
          fetch(`/api/categories/${categoryId}`)
        ]);
        
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products);
        }
        
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategory(categoryData.category);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <div className="bg-gray-200 h-48 mb-4"></div>
                  <div className="bg-gray-200 h-4 mb-2"></div>
                  <div className="bg-gray-200 h-4 mb-2"></div>
                  <div className="bg-gray-200 h-6 mb-3"></div>
                  <div className="bg-gray-200 h-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a 
              href="/categories" 
              className="flex items-center gap-2 text-[#394eaa] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a categorías
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category?.name || 'Categoría'}
          </h1>
          
          {category?.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-600">
              Pronto agregaremos productos aquí
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const images = JSON.parse(product.images);
              const discount = product.discount || 0;
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image */}
                  <div className="relative">
                    <a href={`/product/${product.id}`}>
                      <img
                        src={images[0] || ''}
                        alt={product.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                    </a>
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Vendido por: <span className="text-[#394eaa] font-medium">{product.vendor}</span>
                    </p>
                    
                    <a href={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#394eaa]">
                        {product.title}
                      </h3>
                    </a>
                    
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-3">
                      <p className="text-[#394eaa] font-bold text-lg">
                        ${product.price.toLocaleString("es-AR")}
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString("es-AR")}
                        </p>
                      )}
                    </div>

                    {/* Add to cart button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#394eaa] text-white py-2 rounded-lg hover:bg-[#394eaa]/90 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
