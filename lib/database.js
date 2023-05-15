import mongoose from 'mongoose'

/* const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MongoDB URI')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectTodb() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: 'nextjs', bufferCommands: false })
      .then((mongoose) => {
        return mongoose
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
  return cached.conn
} */

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
