'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
const SignIn = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <div className="profile">
          <Image
            className="profile_img"
            src={session.user.image}
            alt={session.user.name}
            width={25}
            height={25}
          />
          <div className="link" onClick={() => signOut()}>
            Sign out
          </div>
        </div>
      ) : (
        <div className="link" onClick={() => signIn()}>
          Sign In
        </div>
      )}
    </>
  )
}

export default SignIn
