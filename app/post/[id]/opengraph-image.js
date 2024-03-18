import { ImageResponse } from "next/og"
export const runtime = "edge"
export const alt = "E20FIP"
export const size = {
  width: 1200,
  height: 630
}

export const contentType = "image/png"

export default async function Image({ params }) {
  const datas = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getBlogPost?id=${params.id}`
  )
  const blogs = await datas.json()

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          padding: "2em",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#022d3c",
          textAlign: "center"
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(212,147,255,1) 0%, rgba(160,255,219,1) 50%, rgba(255,209,144,1) 100%)",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
            fontSize: 120,
            letterSpacing: -2,
            fontWeight: 700
          }}
        >
          {blogs?.category?.title}
        </div>
        <div
          style={{
            color: "#ffcc00",
            fontSize: 45,
            letterSpacing: -2,
            fontWeight: 700
          }}
        >
          {blogs?.title}
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
