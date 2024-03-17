export default function AboutLayout({ children, sidebar }) {
  return (
    <div className="about">
      <div className="boxmain">{children}</div>
      {sidebar}
    </div>
  )
}
