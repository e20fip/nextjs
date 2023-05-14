'use client'
import { useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import styles from '@/app/utilsStyles/utilsStyles.module.css'

const Form = ({ handlerSubmit }) => {
  const [pending, startTransition] = useTransition()
  const refTitle = useRef(null)
  const refText = useRef(null)
  const router = useRouter()

  return (
    <>
      <div className={styles.content}>
        <div className={styles.form}>
          <label>
            <span>Title</span>
          </label>
          <input type="text" placeholder="title" ref={refTitle} required />
          <label>
            <span>Content</span>
          </label>
          <textarea placeholder="body" ref={refText} required />
          <button
            onClick={async () => {
              startTransition(async () => {
                handlerSubmit(refTitle.current.value, refText.current.value)
                router.push('/')
              })
            }}
            disabled={pending}
          >
            submit
          </button>
        </div>
      </div>
    </>
  )
}

export default Form
