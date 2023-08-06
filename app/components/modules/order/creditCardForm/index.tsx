import React, {ChangeEvent} from 'react'
import { Field, Form } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import fetcher from '../../../../utils/fetcher'

import { Input } from '../../form'
import { cardNumber, cvcCode, expirationDate2 } from '../../form/parsers'
import { expDate, email, cardNum } from '../../form/validators'

import { Button } from 'antd'
import styles from './card.module.css'

export interface Props {
  setValues: (value: boolean) => void
}

export default function CreditCard({setValues}: Props) {
  const cardNumberRef = React.useRef(null)
  const codeRef = React.useRef(null)
  const expirationDate = React.useRef(null)

  const [ cardNumberLength, setCardNumberLength ] = React.useState<number>(0)
  const [ expirationDateLength, setExpirationDateLength ] = React.useState<number>(0)

  const onSubmit = React.useCallback(async (values: Record<string, string>, form: any) => {
    setValues(true)
  }, [])

  React.useEffect(() => {
    // @ts-ignore
    cardNumberRef.current.input.focus()
  }, [])

  React.useEffect(() => {
    console.log(cardNumberRef.current)
    // @ts-ignore
    if (cardNumberRef.current.input.textLength >= 19) {
      // @ts-ignore
      expirationDate.current.input.focus()
    }
    // @ts-ignore
    if (expirationDate.current.input.textLength >= 5) {
      // @ts-ignore
      codeRef.current.input.focus()
    }
  })

  const handleChange = React.useCallback(() => {
    codeRef.current.input.focus()
  }, [])

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit} className={styles.mainBlock}>
            <Field name="cardNumber" ref={cardNumberRef} component={Input} label="Номер карты" parse={cardNumber}
                   width={300} height={50} maxLength={23}/>
            <OnChange name="cardNumber">
              {() => {
                if (cardNumberRef?.current.input.textLength >= 2) {
                  expirationDate.current.input.focus()
                }
              }}
            </OnChange>
            <div className={styles.lowerContainer}>
              <Field name="expirationDate" ref={expirationDate} component={Input} label="Месяц/Год"
                     parse={expirationDate2} validate={expDate} width={150} height={50} maxLength={5}/>
              <OnChange name="expirationDate">
                {() => {
                  setCardNumberLength(expirationDate.current.input.textLength)
                  console.log(expirationDate?.current.input.textLength)
                  if (cardNumberLength >= 2) {
                    handleChange()
                  }
                }}
              </OnChange>
              <Field name="code" ref={codeRef} component={Input} label="CVC/CVV-код" parse={cvcCode} width={150}
                     height={50} maxLength={3}/>
              <OnChange name="code">
                {() => {
                }}
              </OnChange>
            </div>
            <Field name="email"  component={Input} label="Электронная почта" validate={email} width={300} height={50}/>
            <Button type="primary" htmlType="submit" disabled={submitting}
                    className={styles.submitButton}>Отправить</Button>
          </form>
        )}
      />
    </div>
  )
}

