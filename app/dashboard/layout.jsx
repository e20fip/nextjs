export default function DashBoardLayout({ children, admin, member }) {
  return (
    <>
      <div className="content">
        {children}
        {admin}
        {member}
      </div>
    </>
  )
}
