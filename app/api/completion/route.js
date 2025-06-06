import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI)
// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-2.0-flash" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    })

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
