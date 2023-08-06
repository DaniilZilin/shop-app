import React from 'react'
import { Form, Field } from 'react-final-form'
import MainLayout from "../../../../Layout";

import { Input, PhoneNumber } from '../../form'
import { email } from '../../form/validators'
import styles from "../creditCardForm/card.module.css";
import {Button} from "antd";

export interface Props {
  setUserId: (value: boolean) => void
}

export default function UserForm({ setUserId }: Props) {
  const emailRef = React.useRef(null)

  const onSubmit = React.useCallback(async() => {
    setUserId(true)
  }, [])

  // React.useEffect(() => {
  //   // @ts-ignore
  //     emailRef.current.input.focus()
  // })

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
            <Field name="phoneNumber" label="Телефон" component={PhoneNumber} width={250} />
            <Field name="firstName" label="Имя" component={Input} width={250} />
            <Field name="lastName" label="Фамилия" component={Input} width={250} />
            <Button type="primary" htmlType="submit" disabled={submitting} className={styles.submitButton}>Отправить</Button>
          </form>
        )}
      />
    </>
    </MainLayout>
  )
}