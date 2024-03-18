export async function metadata() {
  return {
    title: "About | E20FIP",
    description: "web dev",
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/about`
    }
  }
}
export default function AboutLayout({ children, sidebar }) {
  return (
    <div className="about">
      <div className="boxmain">{children}</div>
      {sidebar}
    </div>
  )
}
