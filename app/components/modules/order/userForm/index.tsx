import React from 'react'
import { Form, Field } from 'react-final-form'

import { Input } from '../../form'
import { email } from '../../form/validators'
import { phoneNumber } from '../../form/parsers'

export interface Props {
  setUserId: (value: boolean) => void
}

export default function UserForm({ setUserId }: Props) {
  const onSubmit = React.useCallback(async() => {
    setUserId(true)
  }, [])

  return (
    <>
      <div>
        Данные о покупателе
      </div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting}) => (
          <form onSubmit={ handleSubmit }>
            <Field name="email" placeholder="E-mail" component={Input} validate={email} />
            <Field name="phoneNumber" placeholder="Телефон" component={Input} parse={phoneNumber} />
            <Field name="firstName" placeholder="Имя" component={Input} />
            <Field name="lastName" placeholder="Фамилия" component={Input} />
            <input type="submit" disabled={submitting} value="Продолжить" />
          </form>
        )}
      />
    </>
  )
}