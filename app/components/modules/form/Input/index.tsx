import React from 'react'
import Field from '../Field'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Space, Input } from 'antd';

export interface Props {
  meta: any,
  input: any,
  width: number,
  height: number,
  maxLength: number
  status: string,
  hasError: any,
  label: string,
  ref: React.ForwardedRef<HTMLInputElement>
}

export default function Input2({ meta, input, width, height, maxLength, status, label, ref }: Props) {

  React.useEffect(() => {
    console.log(ref)
  })

  return (
    <Field meta={meta} input={input} label={label}>
      <Space direction="horizontal">
        {input.name === 'cvcCode' ?
          <Input.Password {...input} maxLength={maxLength} style={{width: `${width}px`, height: `${height}px`}}
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} /> :
          <Input {...input} maxLength={maxLength} style={{width: `${width}px`, height: `${height}px`}} />}
      </Space>
    </Field>
  )
}

