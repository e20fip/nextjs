export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`
  }
}
