import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Crear categorías
  const categories = [
    { name: 'Electrónicos', description: 'Productos electrónicos y tecnología' },
    { name: 'Hogar y Jardín', description: 'Productos para el hogar y jardín' },
    { name: 'Deportes', description: 'Artículos deportivos y fitness' },
    { name: 'Moda', description: 'Ropa y accesorios' },
    { name: 'Libros', description: 'Libros y material educativo' },
    { name: 'Juguetes', description: 'Juguetes y entretenimiento' },
    { name: 'Automotriz', description: 'Accesorios para vehículos' },
    { name: 'Salud y Belleza', description: 'Productos de salud y belleza' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Crear usuarios de ejemplo
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const users = [
    {
      name: 'María González',
      email: 'maria@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Ana Martínez',
      email: 'ana@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Luis Pérez',
      email: 'luis@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Sofia López',
      email: 'sofia@example.com',
      password: hashedPassword,
      role: 'user',
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    createdUsers.push(createdUser);
  }

  // Obtener categorías para usar en productos
  const allCategories = await prisma.category.findMany();

  // Productos ficticios de clientes
  const products = [
    {
      title: 'iPhone 14 Pro - Usado en Excelente Estado',
      description: 'iPhone 14 Pro de 128GB, color Space Black. Incluye cargador original y funda de silicona. Perfecto estado, solo 6 meses de uso.',
      price: 899999,
      originalPrice: 1200000,
      discount: 25,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      ]),
      vendor: 'María González',
      categoryId: allCategories.find(c => c.name === 'Electrónicos')?.id,
      userId: createdUsers[0].id,
    },
    {
      title: 'Bicicleta Mountain Bike Trek Marlin 5',
      description: 'Bicicleta de montaña Trek Marlin 5, talla M, color azul. Ideal para senderos y ciudad. Incluye luces LED y portabotellas.',
      price: 450000,
      originalPrice: 600000,
      discount: 25,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500',
      ]),
      vendor: 'Carlos Rodríguez',
      categoryId: allCategories.find(c => c.name === 'Deportes')?.id,
      userId: createdUsers[1].id,
    },
    {
      title: 'Sofá 3 Plazas Moderno - Gris',
      description: 'Sofá moderno de 3 plazas, color gris. Material: poliéster premium. Incluye cojines decorativos. Perfecto para sala de estar.',
      price: 320000,
      originalPrice: 450000,
      discount: 29,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      ]),
      vendor: 'Ana Martínez',
      categoryId: allCategories.find(c => c.name === 'Hogar y Jardín')?.id,
      userId: createdUsers[2].id,
    },
    {
      title: 'Nintendo Switch OLED - Bundle Completo',
      description: 'Nintendo Switch OLED con 5 juegos incluidos: Mario Kart 8, Zelda BOTW, Animal Crossing, Mario Odyssey y Smash Bros. Incluye funda y cargador.',
      price: 380000,
      originalPrice: 520000,
      discount: 27,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
        'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      ]),
      vendor: 'Luis Pérez',
      categoryId: allCategories.find(c => c.name === 'Electrónicos')?.id,
      userId: createdUsers[3].id,
    },
    {
      title: 'Colección Completa Harry Potter - Edición Especial',
      description: 'Los 7 libros de Harry Potter en edición especial con tapa dura. Incluye mapa de Hogwarts y marcapáginas oficiales. Estado como nuevo.',
      price: 85000,
      originalPrice: 120000,
      discount: 29,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      ]),
      vendor: 'Sofia López',
      categoryId: allCategories.find(c => c.name === 'Libros')?.id,
      userId: createdUsers[4].id,
    },
    {
      title: 'MacBook Air M2 - 256GB Space Gray',
      description: 'MacBook Air con chip M2, 256GB SSD, 8GB RAM. Color Space Gray. Incluye cargador MagSafe y funda de neopreno. Solo 8 meses de uso.',
      price: 1200000,
      originalPrice: 1600000,
      discount: 25,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      ]),
      vendor: 'María González',
      categoryId: allCategories.find(c => c.name === 'Electrónicos')?.id,
      userId: createdUsers[0].id,
    },
    {
      title: 'Set de Golf Completo Callaway',
      description: 'Set completo de golf Callaway Strata, incluye: driver, maderas, hierros, putter y bolsa. Ideal para principiantes e intermedios.',
      price: 280000,
      originalPrice: 380000,
      discount: 26,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500',
        'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500',
      ]),
      vendor: 'Carlos Rodríguez',
      categoryId: allCategories.find(c => c.name === 'Deportes')?.id,
      userId: createdUsers[1].id,
    },
    {
      title: 'Cámara Canon EOS R6 Mark II',
      description: 'Cámara mirrorless Canon EOS R6 Mark II con lente RF 24-105mm f/4L. Incluye trípode Manfrotto, filtros UV y bolsa de transporte.',
      price: 850000,
      originalPrice: 1100000,
      discount: 23,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      ]),
      vendor: 'Ana Martínez',
      categoryId: allCategories.find(c => c.name === 'Electrónicos')?.id,
      userId: createdUsers[2].id,
    },
    {
      title: 'Mesa de Ping Pong Profesional',
      description: 'Mesa de ping pong profesional Butterfly, plegable. Incluye 4 paletas profesionales, 6 pelotas y red oficial. Estado impecable.',
      price: 180000,
      originalPrice: 250000,
      discount: 28,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      ]),
      vendor: 'Luis Pérez',
      categoryId: allCategories.find(c => c.name === 'Deportes')?.id,
      userId: createdUsers[3].id,
    },
    {
      title: 'Set de Cocina Profesional Le Creuset',
      description: 'Set de cocina Le Creuset con 6 piezas: olla, sartén, cacerola, wok, tetera y bandeja. Color azul marino. Incluye espátulas de silicona.',
      price: 420000,
      originalPrice: 580000,
      discount: 28,
      stock: 1,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
      ]),
      vendor: 'Sofia López',
      categoryId: allCategories.find(c => c.name === 'Hogar y Jardín')?.id,
      userId: createdUsers[4].id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
