import React, { ChangeEvent } from 'react'
import Field from '../Field'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Space, Input } from 'antd'

export interface Props {
  meta: any,
  input: any,
  label: string,
  width: number,
  height: number,
  maxLength: number,
}

// React.forwardRef(function Input2({ meta, input, width, height, maxLength, label }: Props, ref) {
const Input2 = React.forwardRef(function Input2({ meta, input, label, width, height, maxLength }: Props, ref) {
  return (
    <Field meta={meta} input={input} label={label}>
      <Space direction="horizontal">
        {input.name === 'code' ?
          <Input.Password {...input} ref={ref} maxLength={maxLength}
            style={{width: `${width}px`, height: `${height}px`}}
            iconRender={(visible) => (visible ? <EyeTwoTone /> :
            <EyeInvisibleOutlined />)} /> :
          <Input {...input} ref={ref} maxLength={maxLength} style={{width: `${width}px`, height: `${height}px`}} />}
      </Space>
    </Field>
  )
})

export default Input2