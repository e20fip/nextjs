'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import styles from '@/app/utilsStyles/utilsStyles.module.css'

const Form = ({ handlerSubmit }) => {
  const refTitle = useRef()
  const refText = useRef()
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
              handlerSubmit(refTitle.current.value, refText.current.value)
              router.push('/')
            }}
          >
            submit
          </button>
        </div>
      </div>
    </>
  )
}

export default Form
