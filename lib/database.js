import mongoose from 'mongoose'
let isConnected = false
export const connectTodb = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'nextjs',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    isConnected = true
  } catch (error) {
    console.log(error)
  }
}
