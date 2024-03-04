"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const SignIn = () => {
  const { data: session, status } = useSession()
  const [isShowProfile, setIsShowProfile] = useState(false)

  return (
    <>
      {status !== "loading" && session?.user ? (
        <>
          <div
            className="profile"
            onClick={() => setIsShowProfile((prev) => !prev)}
          >
            <Image
              className="profile_img"
              src={session.user.image}
              alt={session.user.name}
              width={35}
              height={35}
              priority
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
        <div className="profile" onClick={() => signIn()}>
          <Image
            src="/images/login.png"
            alt="login"
            width={35}
            height={35}
            priority
          />
        </div>
      )}
    </>
  )
}

const ProfileBlock = ({ session, setIsShowProfile }) => {
  return (
    <div className="profile_block">
      <span>
        {session?.user.name}
        <br />
        {session?.user.email}
      </span>
      {session?.user.role === "admin" ? (
        <>
          <span>
            <Link
              href={"/category/create"}
              onClick={() => setIsShowProfile((prev) => !prev)}
            >
              Category
            </Link>
          </span>
          <span>
            <Link
              href={"/blog/edit"}
              onClick={() => setIsShowProfile((prev) => !prev)}
            >
              Edit Blog
            </Link>
          </span>
          <span>
            <Link
              href={"/blog/create"}
              onClick={() => setIsShowProfile((prev) => !prev)}
            >
              Create Blog
            </Link>
          </span>
        </>
      ) : (
        ""
      )}
      <button className="small_btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  )
}

export default SignIn
