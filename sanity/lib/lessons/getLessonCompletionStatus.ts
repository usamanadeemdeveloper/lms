import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { getStudentByClerkId } from "../student/getStudentByClerkId";

export async function getLessonCompletionStatus(
  lessonId: string,
  clerkId: string
) {
  // First get the student's Sanity ID
  const student = await getStudentByClerkId(clerkId);

  if (!student?._id) {
    throw new Error("Student not found");
  }

  const completionStatusQuery =
    defineQuery(`*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0] {
    ...
  }`);

  const result = await sanityFetch({
    query: completionStatusQuery,
    params: { studentId: student._id, lessonId },
  });

  return result.data !== null;
}
