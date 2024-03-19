import { put, del } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: "public"
    })
    return NextResponse.json(blob)
  }
  return NextResponse.json({ message: "No file" })
}

export async function DELETE(request) {
  const url = await request.json()
  if (!url) return NextResponse.json({ message: "file not found" })
  await del(url)
  return NextResponse.json({ message: "file delete" })
}
