import { Schema, model, models } from 'mongoose'
const BlogSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    title: {
      type: String,
      required: [true, 'title required']
    },
    description: {
      type: String,
      required: [true, 'description required']
    },
    content: {
      type: String,
      required: [true, 'text content required']
    }
  },
  { timestamps: true }
)

const Blog = models.Blog || model('Blog', BlogSchema)
export default Blog
