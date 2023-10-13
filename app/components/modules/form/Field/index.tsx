import React from 'react'

export interface Props {
  label: string,
  error: string,
  children: React.ReactNode,
}

export default function Field({ label, children, error }: Props) {
  return (
    <div>
      <div>{label}</div>
       {children}
      {!!error && (<div>{error}</div>)}
    </div>
  )
}