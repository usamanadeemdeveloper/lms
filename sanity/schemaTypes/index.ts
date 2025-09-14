import { type SchemaTypeDefinition } from 'sanity'
import { lessonType } from './lessonType'
import { courseType } from './courseType'
import { moduleType } from './moduleType'
import { studentType } from './studentType'
import { blockContent } from './blockContent'
import { categoryType } from './categoryType'
import { instructorType } from './instructorType'
import { enrollmentType } from './enrollmentType'
import { lessonCompletionType } from './lessonCompletionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    courseType,
    moduleType,
    lessonType,
    studentType,
    blockContent,
    categoryType,
    instructorType,
    enrollmentType,
    lessonCompletionType,
  ],
}
