import React from 'react'

interface CheckMarkProps {
  fill?: string
}

const CheckMark = ({ fill }: CheckMarkProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={20}
      height={20}
    >
      <path
        d="M178.061 415.272l-135.765-135.766 45.254-45.254 90.511 90.511 181.023-181.023 45.254 45.254z"
        fill={fill ? fill : '#e6e6e6'}
      />
    </svg>
  )
}

export default CheckMark
