import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getStudentByClerkId(clerkId: string) {
  const getStudentByClerkIdQuery = defineQuery(
    `*[_type == "student" && clerkId == $clerkId][0]`
  );

  const student = await sanityFetch({
    query: getStudentByClerkIdQuery,
    params: { clerkId },
  });

  return student.data;
}
