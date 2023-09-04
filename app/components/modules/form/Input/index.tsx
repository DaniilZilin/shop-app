import React from 'react'
import Field from '../Field'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Space, Input as BaseInput } from 'antd'

export interface Props {
  input?: any;
  name?: string;
  meta?: any;
  label?: any;
  width?: number;
  height?: number;
  maxLength?: number;
  // onChange(length: number): void,
  value?: string
}

// React.forwardRef(function Input2({ meta, input, width, height, maxLength, label }: Props, ref) {
const Input = React.forwardRef(function Input({ meta, input, label, width, height, maxLength, value }: Props, ref) {
  return (
    <Field meta={meta} input={input} label={label}>
      <Space direction="horizontal">
        {/*{input.name === "code" ?*/}
        {/*  <BaseInput.Password {...input} ref={ref} maxLength={maxLength}*/}
        {/*    style={{width: `${width}px`, height: `${height}px`}}*/}
        {/*    iconRender={(visible) => (visible ? <EyeTwoTone /> :*/}
        {/*    <EyeInvisibleOutlined />)} /> :*/}
          <BaseInput {...input} ref={ref} value={value} maxLength={maxLength} style={{width: `${width}px`, height: `${height}px`}} />
      </Space>
    </Field>
  )
})

export default Input