import React from 'react'
import Field from '../Field'
import InputMask from 'react-input-mask'

import { Input, Space } from 'antd'

export interface Props {
  meta: any,
  input: any,
  label: string,
  width: number,
  height: number,
  maxLength: number,
}


export default function PhoneNumber({ meta, input, label, width, height }: Props) {
  return (
    <Field meta={meta} input={input} label={label}>
      <Space direction="horizontal">
        <InputMask {...input} mask='+7 (999) 999-99-99' maskPlaceholder='+7 (___)-   -  -'>
          {() => (
            <Input style={{width: `${width}px`, height: `${height}px`}} />
          )}
        </InputMask>
      </Space>
    </Field>
  )
}