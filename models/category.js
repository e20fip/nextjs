import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  title: {
    type: String,
    require: [true, 'title required']
  }
})

const Category = models.Category || model('Category', CategorySchema)
export default Category
