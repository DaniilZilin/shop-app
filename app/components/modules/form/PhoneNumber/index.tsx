import React, { ChangeEvent } from 'react'
import Field from '../Field'
import InputMask from 'react-input-mask'
import { Space, Input } from 'antd'



export interface Props {
  // name: string;
  // label: string;
  // width: number;
  // height: number;
  // onChange(value: any): void;
  // error: string | null,
}

export default function PhoneNumber() {
// const PhoneNumber = React.forwardRef(function PhoneNumber({ label, onChange, width, height, error }: Props, ref) {
//   const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value)
//   }, [ onChange ])

  return (
    // <Field label={label} error={error}>
      <InputMask >
        <Input />
      </InputMask>
    // </Field>
  )
}

// export default PhoneNumber