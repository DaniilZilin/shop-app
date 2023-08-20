import React from 'react'
import { Form, Field } from 'react-final-form'
import MainLayout from '../../../../Layout'

import { Input, PhoneNumber } from '../../form'
import { email, name, phone } from '../../form/validators'
import styles from '../creditCardForm/card.module.css'
import { Button } from 'antd'
import { OnBlur, OnChange } from 'react-final-form-listeners'

export interface Props {
  setUserId: (value: boolean) => void
}

export default function UserForm({ setUserId }: Props) {
  const firstName = React.useRef(null)
  const lastName = React.useRef(null)

  const onSubmit = React.useCallback(async() => {
    setUserId(true)
  }, [])

  const [ firstNameState, setFirstNameState ] = React.useState('')

  React.useEffect(() => {
    console.log(firstNameState)
    setFirstNameState(firstName.current.input.value)
  })

  return (
    <MainLayout>
    <>
      <div>
        Данные о покупателе
      </div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting}) => (
          <form onSubmit={ handleSubmit }>
            <Field name="email" label="E-mail" component={Input} validate={email} width={250} />
            <Field name="phoneNumber" label="Телефон" component={PhoneNumber} validate={phone} width={250} />
            <Field name="firstName" ref={firstName} label="Имя" component={Input} validate={name} width={250} value={firstNameState} />
            <OnBlur name="firstName">
              {() => (
                setFirstNameState(firstNameState.toUpperCase())
              )}
            </OnBlur>
            <OnChange name="firstName">
              {(value, previous) => {

              }}
            </OnChange>
            <Field name="lastName" ref={lastName} label="Фамилия" component={Input} validate={name} width={250} />
            <Button type="primary" htmlType="submit" disabled={submitting} className={styles.submitButton}>Отправить</Button>
          </form>
        )}
      />
    </>
    </MainLayout>
  )
}