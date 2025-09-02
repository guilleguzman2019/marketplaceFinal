"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { ChevronRight, ChevronLeft } from "lucide-react";

const ImageSlider = () => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    {
      id: 1,
      src: "https://http2.mlstatic.com/D_NQ_723470-MLA91301149971_082025-OO.webp",
      alt: "Promoción 1",
    },
    {
      id: 2,
      src: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/6228c1f5-23c3-4bfe-9739-d10abb930ab8___0c60f7ba3db4a93a9dc010f5efbae519.jpg",
      alt: "Promoción 2",
    },
    {
      id: 3,
      src: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/92675cd1-4a51-4a4d-9c1e-442673b80a86___511d9f795447081ed8fb7ea1b806d92a.jpg",
      alt: "Promoción 3",
    },
    {
      id: 4,
      src: "https://viamarket.vtexassets.com/assets/vtex.file-manager-graphql/images/0b35615c-b4e3-486b-b5e0-d13b1b837063___81134f2aa2d35bd9c7a4e87290882d0e.jpg",
      alt: "Promoción 4",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-gray-400 opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-red-600",
        }}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as any;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        className="relative overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* 👇 Ajuste clave: altura fija + object-cover */}
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="100vw"
                quality={90}
                priority={slide.id === 1}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Botón izquierdo */}
        <div
          ref={prevRef}
          className="text-6xl absolute left-2 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 flex items-center justify-center 
                     bg-white/80 backdrop-blur text-blue-600 shadow-md 
                     cursor-pointer hover:opacity-80 transition-opacity opacity-40 hidden sm:flex"
        >
          <ChevronLeft className="z-10" />
        </div>

        {/* Botón derecho */}
        <div
          ref={nextRef}
          className="text-6xl absolute right-2 top-1/2 -translate-y-1/2 z-10 
                     w-10 h-10 flex items-center justify-center 
                     bg-white/80 backdrop-blur text-blue-600 shadow-md 
                     cursor-pointer hover:opacity-80 transition-opacity opacity-40 hidden sm:flex"
        >
          <ChevronRight className="z-10" />
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
