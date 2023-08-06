import React from 'react'
import Field from '../Field'

export interface Props {
  meta: any,
  input: any,
  label: string,
  width: number,
  height: number,
  maxLength: number,
}


export default function PhoneNumber({meta, input, label, width,height, maxLength}: Props) {
  return (
    <Field meta={meta} input={input} label={label}>
      {/*<InputMask mask='+7 ()' />*/}
    </Field>
  )
}