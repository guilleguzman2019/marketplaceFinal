"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShoppingCart } from "lucide-react";
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
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Todos los Productos</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394eaa]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#394eaa]"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
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
                        className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform"
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
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#394eaa] transition-colors">
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
