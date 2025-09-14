import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

async function getCourseBySlug(slug: string) {
  const getCourseBySlugQuery =
    defineQuery(`*[_type == "course" && slug.current == $slug][0] {
      ...,
      "category": category->{...},
      "instructor": instructor->{...},
      "modules": modules[]-> {
        ...,
        "lessons": lessons[]-> {...}
      }
    }`);

  const course = await sanityFetch({
    query: getCourseBySlugQuery,
    params: { slug },
  });

  return course.data;
}

export default getCourseBySlug;
