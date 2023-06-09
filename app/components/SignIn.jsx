'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SignIn = () => {
  const { data: session } = useSession()
  const [isShowProfile, setIsShowProfile] = useState(false)

  return (
    <>
      {session?.user ? (
        <>
          <div
            className="profile"
            onClick={() => setIsShowProfile((prev) => !prev)}
          >
            <Image
              className="profile_img"
              src={session.user.image}
              alt={session.user.name}
              width={25}
              height={25}
            />
          </div>
          {isShowProfile && <ProfileBlock session={session} />}
        </>
      ) : (
        <div className="link" onClick={() => signIn()}>
          Sign In
        </div>
      )}
    </>
  )
}

const ProfileBlock = ({ session }) => {
  return (
    <div className="profile_block">
      <span>
        {session?.user.name}
        <br />
        {session?.user.email}
      </span>
      {session?.user.role === 'admin' ? (
        <>
          <span>
            <Link href={'/category/create'}>Category</Link>
          </span>
          <span>
            <Link href={'/blog/edit'}>Edit Blog</Link>
          </span>
          <span>
            <Link href={'/blog/create'}>Create Blog</Link>
          </span>
        </>
      ) : (
        ''
      )}
      <button className="small_btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  )
}

export default SignIn
