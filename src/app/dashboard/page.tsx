"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  isActive: boolean;
  createdAt: string;
  images: string;
  vendor: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await fetch("/api/products/my-products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMyProducts();
    }
  }, [session]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#394eaa] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Bienvenido, {session.user.name || session.user.email}
            </p>
          </div>
          <a
            href="/add-product"
            className="bg-[#394eaa] text-white px-6 py-3 rounded-lg hover:bg-[#394eaa]/90 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Vender Producto
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Productos</h3>
            <p className="text-3xl font-bold text-[#394eaa]">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Productos Activos</h3>
            <p className="text-3xl font-bold text-green-600">
              {products.filter(p => p.isActive).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Valor Total</h3>
            <p className="text-3xl font-bold text-[#394eaa]">
              ${products.reduce((sum, p) => sum + p.price, 0).toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Mis Productos</h2>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded">
                    <div className="bg-gray-200 w-16 h-16 rounded"></div>
                    <div className="flex-1">
                      <div className="bg-gray-200 h-4 mb-2"></div>
                      <div className="bg-gray-200 h-4 w-1/2"></div>
                    </div>
                    <div className="bg-gray-200 h-8 w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-400 mb-4">
                <Plus className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes productos aún
              </h3>
              <p className="text-gray-600 mb-4">
                Comienza vendiendo tu primer producto
              </p>
              <a
                href="/add-product"
                className="bg-[#394eaa] text-white px-6 py-2 rounded-lg hover:bg-[#394eaa]/90"
              >
                Vender Producto
              </a>
            </div>
          ) : (
            <div className="divide-y">
              {products.map((product) => {
                const images = JSON.parse(product.images);
                return (
                  <div key={product.id} className="p-6 flex items-center gap-4">
                    <img
                      src={images[0] || ''}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.vendor}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[#394eaa] font-bold">
                          ${product.price.toLocaleString("es-AR")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${product.originalPrice.toLocaleString("es-AR")}
                          </span>
                        )}
                        <span className="text-sm text-gray-600">
                          Stock: {product.stock}
                        </span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#394eaa]">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#394eaa]">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
