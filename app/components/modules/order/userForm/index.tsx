import React from 'react'
import MainLayout from '../../../../Layout'

import { Input, PhoneNumber } from '../../form'
import {email, name, phone} from '../../form/validators'
import styles from '../creditCardForm/card.module.css'
import { Button } from 'antd'

export interface Props {
  setUserId: (value: boolean) => void
}

export default function UserForm({setUserId}: Props) {
  const firstName = React.useRef(null)
  const lastName = React.useRef(null)

  const onSubmit = React.useCallback(async () => {
    setUserId(true)
  }, [])

  React.use

  return (
    <MainLayout>
      <>
        <div>
          Данные о покупателе
        </div>
        <form onSubmit={onSubmit}>
          <Input name="email" label="E-mail" width={250} height={50} maxLength={20} />
          <PhoneNumber name="phoneNumber" label="Телефон" width={250} height={50} maxLength={20} />
          <Input name="firstName" label="Имя" ref={firstName} width={250} height={50} maxLength={20} />
          <Input name="lastName" label="Фамилия" ref={lastName} width={250} height={50} maxLength={20} />
          <Button type="primary" htmlType="submit" className={styles.submitButton}>Отправить</Button>
        </form>

        {/*<Form*/}
        {/*  onSubmit={onSubmit}*/}
        {/*  render={({handleSubmit, submitting}) => (*/}
        {/*    <form onSubmit={handleSubmit}>*/}
        {/*      <Field name="email" label="E-mail" component={Input} validate={email} width={250}/>*/}
        {/*      <Field name="phoneNumber" label="Телефон" component={PhoneNumber} validate={phone} width={250}/>*/}
        {/*      <Field name="firstName" ref={firstName} label="Имя" component={Input} validate={name} width={250}/>*/}
        {/*      <Field name="lastName" ref={lastName} label="Фамилия" component={Input} validate={name} width={250}/>*/}
        {/*      <Button type="primary" htmlType="submit" disabled={submitting}*/}
        {/*              className={styles.submitButton}>Отправить</Button>*/}
        {/*    </form>*/}
        {/*  )}*/}
        {/*/>*/}
      </>
    </MainLayout>
  )
}