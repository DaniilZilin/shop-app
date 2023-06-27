import React from 'react'
import { Field, Form } from 'react-final-form'
import fetcher from '../../../../utils/fetcher'

import { Input } from '../../form'
import { cardNumber, cvcCode, expirationDate } from '../../form/parsers'
import { expDate, email, cardNum } from '../../form/validators'

import styles from './card.module.css'
import Image from 'next/image'

import { YMaps, Map } from "react-yandex-maps";

export interface Props {
  setValues: (value: boolean) => void
}

export default function CreditCard({ setValues }: Props) {
  const [ cvcState, setCvcState ] = React.useState<number>(0)

  const onSubmit = React.useCallback(async(values: Record<string, string>, form: any) => {
      setValues(true)
    // const result = await fetcher('localhost:3000/api/v1/card/create/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify(values)
    // })
  }, [])

  const cvcFunction = React.useCallback(() => {
    setCvcState((cvcState + 1) % 2)
  }, [ setCvcState, cvcState])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageName}>Оплата картой</div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="cardNumber" component={Input} placeholder="Номер карты" parse={cardNumber} width={200} height={40} maxLength={23} />
            <div className={styles.lowerContainer}>
              <Field name="expirationDate" component={Input} placeholder="Месяц/Год" parse={expirationDate} validate={expDate} width={100} height={40} maxLength={5} />
              <Field name="cvcCode" type={cvcState ? 'text' : 'password'} component={Input} placeholder="CVC/CVV-код" parse={cvcCode} width={100} height={40} maxLength={3} />
              <div>
                <Image src={'/img/eye.jpg'} width={'25'} height={'25'} className={styles.eyeImage} onClick={cvcFunction} alt="eye" />
              </div>
            </div>
            <Field name="email" component={Input} placeholder="Электронная почта" validate={email} width={200} height={40} />
            <input type="submit" value="Отправить" disabled={submitting} className={styles.submitButton} />
          </form>
        )}
      />
    </div>
  )
}