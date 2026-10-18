import type { CourseReview } from "@/lib/types/course";

export const initialReviews: CourseReview[] = [
  {
    id: "review-alex",
    name: "Alex Morgan",
    date: "Oct 10, 2025",
    rating: 5,
    comment:
      "The lessons are clear and practical. I finally understand how to turn keyword research into a plan I can use for my own business.",
    avatarColor: "#dfeef2",
  },
  {
    id: "review-sofia",
    name: "Sofia Bennett",
    date: "Oct 05, 2025",
    rating: 5,
    comment:
      "A great starting point if SEO feels overwhelming. Edward explains each idea in a friendly, easy-to-follow way.",
    avatarColor: "#f5e7de",
  },
  {
    id: "review-daniel",
    name: "Daniel Carter",
    date: "Sep 28, 2025",
    rating: 4,
    comment:
      "Well structured and useful examples throughout. I especially liked the action plan at the end of the course.",
    avatarColor: "#e5e9f7",
  },
];

export const featuredCourseReviews: CourseReview[] = [
  {
    id: "course-review-maya",
    name: "Maya Hassan",
    date: "Oct 02, 2026",
    rating: 5,
    comment:
      "The lessons are clear and well organized. The practical examples helped me understand how to apply each topic.",
    avatarColor: "#dcecf8",
  },
  {
    id: "course-review-youssef",
    name: "Youssef Adel",
    date: "Sep 26, 2026",
    rating: 5,
    comment:
      "A useful learning path with a good pace. I especially enjoyed building along with the course projects.",
    avatarColor: "#eee3f8",
  },
  {
    id: "course-review-nour",
    name: "Nour Samir",
    date: "Sep 19, 2026",
    rating: 4,
    comment:
      "The content is easy to follow and gives a solid foundation for continuing to learn this subject.",
    avatarColor: "#dff1e9",
  },
];
