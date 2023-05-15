import Ad from './sidebar/ad'

export default function AboutLayout({ children }) {
  return (
    <div className="about">
      <div className="boxmain">{children}</div>
      <Ad />
    </div>
  )
}
