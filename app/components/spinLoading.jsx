export function SpinLoading(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  )
}

export function TablerBaselineDensityMedium(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#ffac38"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.85}
        d="M4 20h16M4 12h16M4 4h16"
      ></path>
    </svg>
  )
}

export function SvgSpinners6DotsRotate(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="4rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <circle cx={12} cy={2.5} r={1.5} fill="#ffac38" opacity={0.14}></circle>
        <circle
          cx={16.75}
          cy={3.77}
          r={1.5}
          fill="#ffac38"
          opacity={0.29}
        ></circle>
        <circle
          cx={20.23}
          cy={7.25}
          r={1.5}
          fill="#ffac38"
          opacity={0.43}
        ></circle>
        <circle
          cx={21.5}
          cy={12}
          r={1.5}
          fill="#ffac38"
          opacity={0.57}
        ></circle>
        <circle
          cx={20.23}
          cy={16.75}
          r={1.5}
          fill="#ffac38"
          opacity={0.71}
        ></circle>
        <circle
          cx={16.75}
          cy={20.23}
          r={1.5}
          fill="#ffac38"
          opacity={0.86}
        ></circle>
        <circle cx={12} cy={21.5} r={1.5} fill="#ffac38"></circle>
        <animateTransform
          attributeName="transform"
          calcMode="discrete"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
        ></animateTransform>
      </g>
    </svg>
  )
}
