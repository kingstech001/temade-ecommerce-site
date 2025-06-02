import TopBar from "@/app/components/TopBar";
import NavBar from "@/app/components/NavBar";
import Hero from "@/app/components/Hero";
import CategorySection from "./components/CategoriesSection";
import GalleryCarousel from "@/app/components/GalleryCarousel";
import NewArrivals from "./components/NewArrivals";
import HeroBanner from "./components/HeroBanner";
import TextMarqueeBar from "./components/TextMarqueeBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <NavBar />
      <Hero />
      <CategorySection />
      <GalleryCarousel />
      <NewArrivals />
      <HeroBanner />
      <TextMarqueeBar />
   <div className="w-full flex justify-center">
       <Footer />
    </div>
    </main>
  );
}
