import { FeaturedCourses } from "@/components/coursesPage/featured-courses";
import { HomeHero } from "@/components/home/home-hero";
import { Testimonials } from "@/components/home/testimonials";

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f9fb] text-ink">
      <HomeHero />
      <FeaturedCourses />
      <Testimonials />
    </main>
  );
}
