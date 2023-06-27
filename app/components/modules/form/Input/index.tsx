import React from 'react'
import Field from '../Field'

export interface Props {
  meta: any,
  input: any,
  placeholder: string,
  width: number,
  height: number,
  maxLength: number
}

export default function Input({ meta, input, placeholder, width, height, maxLength }: Props) {
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    // @ts-ignore
    if (inputRef.current.name === 'cardNumber') {
      // @ts-ignore
      inputRef.current.focus()
    }
  }, [])

  return (
    <Field meta={meta} input={input}>
      <input {...input} ref={inputRef} maxLength={maxLength} placeholder={placeholder} style={{width: `${width}px`, height: `${height}px`}} />
    </Field>
  )
}
