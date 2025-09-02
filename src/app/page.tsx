import Image from "next/image";

import ImageSlider from "@/components/slider";
import DynamicProductCarousel from "@/components/DynamicProductCarousel";
import Footer from "@/components/footer";
import BrandsCarousel from "@/components/BrandsCarousel";
import PromoBanner from "@/components/PromoBanner";
import Ofertas from "@/components/ofertas";
import Htas from "@/components/htas";

export default function Home() {
  return (
    <div className="">
      <ImageSlider/>
      <div className="max-w-[75rem] mx-auto mt-9">
        <DynamicProductCarousel/>
        <Ofertas/>
        <PromoBanner/>
        <Htas/>
        <BrandsCarousel/>
        <Htas/>
      </div>
      <Footer/>
    </div>
  );
}
