import React, {ChangeEvent} from 'react'
import Field from '../Field'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Space, Input as BaseInput } from 'antd'

export interface Props {
  name?: string;
  label?: any;
  width?: number;
  height?: number;
  maxLength?: number;
  value?: string,
  error: string | null,
  onChange(value: any): void,
  onBlur(): void,
}

// React.forwardRef(function Input2({ meta, input, width, height, maxLength, label }: Props, ref) {
const Input = React.forwardRef(function Input({ onChange, onBlur, label, width, height, maxLength, value, error, name }: Props, ref) {
  const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [ onChange ])

  return (
    <Field label={label} error={error}>
      <Space direction="horizontal">
        {name === "code" ? (
          <BaseInput.Password ref={ref} pattern='/\d/g' maxLength={maxLength} style={{ width: `${width}px`, height: `${height}px` }}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            )
            :
            (
          <BaseInput ref={ref} onBlur={onBlur} onChange={handleChange} value={value} maxLength={maxLength} style={{width: `${width}px`, height: `${height}px`}} />
        )}
      </Space>
    </Field>
  )
})

export default Input