"use client";

const brands = [
  {
    id: 1,
    name: "Pezcalandia",
    img: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/7d2c997f-4540-45d9-b4fa-50e56f9d615d___5b42529ed32e78f306fbf77e58a8b185.jpg",
  },
  {
    id: 2,
    name: "Blessing Hogar",
    img: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/a6aeba71-14cb-437a-9596-4a0366a760ea___b2264cfb907197177d5ecd64329e4f9d.jpg",
  },
  {
    id: 3,
    name: "Go Compras",
    img: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/e82ccf07-105a-4281-af96-80feb530157e___1a55020f36382fd118863c93284add93.png",
  },
  // Puedes agregar más marcas si lo deseas
];

export default function BrandsGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center">
            <div className="w-full h-80  overflow-hidden">
              <img
                src={brand.img}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
