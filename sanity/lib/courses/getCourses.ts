import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getCourses() {
  const getCoursesQuery = defineQuery(`*[_type == "course"] {
    ...,
    "slug": slug.current,
    "category": category->{...},
    "instructor": instructor->{...}
  }`);

  const courses = await sanityFetch({ query: getCoursesQuery });
  return courses.data;
}
