'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
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
          {isShowProfile && (
            <ProfileBlock
              session={session}
              setIsShowProfile={setIsShowProfile}
            />
          )}
        </>
      ) : (
        <div className="link" onClick={() => signIn()}>
          Sign In
        </div>
      )}
    </>
  )
}

const ProfileBlock = ({ session, setIsShowProfile }) => {
  return (
    <div className="profile_block" onClick={() => setIsShowProfile(false)}>
      {session?.user.name}
      <br />
      {session?.user.email}
      <br />
      <button
        className="small_btn"
        onClick={() => (signOut(), setIsShowProfile(false))}
      >
        Sign out
      </button>
    </div>
  )
}

export default SignIn
