import { FeaturedCourses } from "@/components/home/featured-courses";
import { HomeHero } from "@/components/home/HomeHero";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">

      {/* Homepage content */}
      <main className="relative z-10 text-ink">
        <HomeHero />
        <FeaturedCourses />
        <Testimonials />
      </main>
    </div>
  );
}