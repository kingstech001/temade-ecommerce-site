// import TopBar from "@/app/components/TopBar";
// import NavBar from "@/app/components/NavBar";
import Hero from "@/app/components/Hero";
import CategorySection from "./components/CategoriesSection";
import GalleryCarousel from "@/app/components/GalleryCarousel";
import NewArrivals from "./components/NewArrivals";
import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <GalleryCarousel />
      <NewArrivals />
      <HeroBanner />
      
    </main>
  );
}
