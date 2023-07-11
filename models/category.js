import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  title: {
    type: String,
    require: [true, 'title required']
  },
  picture: {
    type: String,
    require: [true, 'photo required']
  }
})

const Category = models.Category || model('Category', CategorySchema)
export default Category
