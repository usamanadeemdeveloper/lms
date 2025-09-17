import { ContentSourceMap, groq } from "next-sanity";
import { client } from "../adminClient";
import { sanityFetch } from "../live";
import { GetStudentByClerkIdQueryResult } from "@/sanity.types";

interface UncompleteLessonParams {
  lessonId: string;
  clerkId: string;
}

export async function uncompleteLessonById({
  lessonId,
  clerkId,
}: UncompleteLessonParams) {
  // Get Sanity student ID from Clerk ID
  const student: {
    data: GetStudentByClerkIdQueryResult;
    sourceMap: ContentSourceMap | null;
    tags: string[];
  } = await sanityFetch({
    query: groq`*[_type == "student" && clerkId == $clerkId][0]._id`,
    params: { clerkId },
  });

  if (!student.data) {
    throw new Error("Student not found");
  }

  // Find and delete the lesson completion record
  await client.delete({
    query: `*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0]`,
    params: { studentId: student.data, lessonId },
  });
}
