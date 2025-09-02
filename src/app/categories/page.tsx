"use client";

import { useState, useEffect } from "react";
import { Grid, ShoppingBag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="bg-gray-200 h-32 mb-4 rounded"></div>
                  <div className="bg-gray-200 h-6 mb-2"></div>
                  <div className="bg-gray-200 h-4"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorías</h1>
          <p className="text-gray-600">
            Explora nuestros productos por categoría
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#394eaa]/10 rounded-lg mb-4 group-hover:bg-[#394eaa]/20 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-[#394eaa]" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#394eaa] transition-colors">
                  {category.name}
                </h3>
                
                {category.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                <div className="mt-4 text-[#394eaa] text-sm font-medium group-hover:underline">
                  Ver productos →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay categorías disponibles
            </h3>
            <p className="text-gray-600">
              Pronto agregaremos categorías aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
