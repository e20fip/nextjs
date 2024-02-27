"use client"
import { useRef, useState, useLayoutEffect } from "react"
import Link from "next/link"

function DisplayLink({ path, count }) {
  let numCount = []
  for (let i = 0; i < count; i++) {
    numCount.push(i + 1)
  }

  return numCount.map((count) => {
    return (
      <div key={count} className="pagination_num">
        <Link href={`${path}/${count === 1 ? "" : count}`}>{count}</Link>
      </div>
    )
  })
}

function MoveLeft({ setCurrentPosition, currentPosition }) {
  if (currentPosition >= 0) {
    return (
      <div className="left_pagi" style={{ visibility: "hidden" }}>
        -
      </div>
    )
  }
  return (
    <div
      className="left_pagi"
      onClick={() => setCurrentPosition((prev) => prev + 350 + 10)}
    >
      -
    </div>
  )
}

function MoveRight({ setCurrentPosition, currentPosition, width }) {
  if (currentPosition * -1 >= width - 350) {
    return (
      <div className="right_pagi" style={{ visibility: "hidden" }}>
        -
      </div>
    )
  }
  return (
    <div
      className="right_pagi"
      onClick={() => setCurrentPosition((prev) => prev - 350 - 10)}
    >
      +
    </div>
  )
}

export default function Pagination({ path, count }) {
  const [currentPosition, setCurrentPosition] = useState(0)
  const targetRef = useRef()
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    if (targetRef.current) {
      setWidth(targetRef.current.scrollWidth)
    }
  }, [])

  return (
    <div className="pagination">
      <MoveLeft
        setCurrentPosition={setCurrentPosition}
        currentPosition={currentPosition}
      />
      <div className="pagination_container">
        <div
          className="pagination_num_container"
          ref={targetRef}
          style={{ transform: `translateX(${currentPosition}px)` }}
        >
          <DisplayLink path={path} count={count} />
        </div>
      </div>
      <MoveRight
        setCurrentPosition={setCurrentPosition}
        currentPosition={currentPosition}
        width={width}
      />
    </div>
  )
}
