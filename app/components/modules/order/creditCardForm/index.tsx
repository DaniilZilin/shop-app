import React, { ChangeEvent } from 'react'

import { Input } from '../../form'
import { cardNumber, cvcCode, expirationDate2 } from '../../form/parsers'
import { expDate, email, cardNum } from '../../form/validators'

import { Button } from 'antd'
import styles from './card.module.css'

export interface Props {
  setValues: (value: boolean) => void
}

export default function CreditCard({ setValues }: Props) {
  const cardNumberRef = React.useRef(null)
  const expirationDateRef = React.useRef(null)
  const codeRef = React.useRef(null)

  const [ cardNumber, setCardNumber ] = React.useState<string | null>("")
  const [ expirationDate, setExpirationDate ] = React.useState<string | null>("")
  const [ code, setCode ] = React.useState<string | null>("")
  const [ email, setEmail ] = React.useState()

  const [ cardNumberError, setCardNumberError ] = React.useState("")
  const [ expirationDateError, setExpirationDateError ] = React.useState("")
  const [ codeError, setCodeError ] = React.useState("")
  const [ emailError, setEmailError ] = React.useState("")

  React.useEffect(() => {
    cardNumberRef.current.input.focus()
  }, [])

  const handleSubmit = React.useCallback( (e: ChangeEvent<HTMLFormElement>) => {
    setValues(true)
  }, [ setValues ])

  const cardNumberHandler = React.useCallback((value: string) => {
    setCardNumber(value)
  }, [ setCardNumber ])

  const expirationDateHandler = React.useCallback((value: string) => {
    setExpirationDate(value)
  }, [ setExpirationDate ])

  const codeHandler = React.useCallback((value: string) => {
    setCode(value)
  }, [ setCode ])

  return (
    <form onSubmit={handleSubmit}>
      <Input name="cardNumber" label="Номер карты" ref={cardNumberRef} onChange={cardNumberHandler} error={emailError} width={300} height={50} maxLength={19} />
      <div style={{ display: 'flex'}}>
        <Input label="Месяц/Год" ref={expirationDateRef} onChange={expirationDateHandler} width={150} height={50} maxLength={5} />
        <Input name="code" label="CVC/CVV-код" ref={codeRef} onChange={codeHandler} width={150} height={50} maxLength={3} />
      </div>
      <Input label="E-mail" width={300} height={50} />
      <Button type="primary" htmlType="submit" className={styles.submitButton}>Отправить</Button>
    </form>

    // <div>
    //   <Form
    //     onSubmit={handleSubmit}
    //     render={({handleSubmit, submitting}) => (
    //       <form onSubmit={handleSubmit} className={styles.mainBlock}>
    //         <Field name="cardNumber" ref={cardNumberRef} component={Input} label="Номер карты" parse={cardNumber} width={300} height={50} maxLength={23} />
    //         <div className={styles.lowerContainer}>
    //           <Field name="expirationDate" ref={expirationDate} component={Input} label="Месяц/Год" parse={expirationDate2} validate={expDate} width={150} height={50} maxLength={5}/>
    //           <Field name="code" ref={codeRef} component={Input} label="CVC/CVV-код" parse={cvcCode} width={150} height={50} maxLength={3}/>
    //         </div>
    //         <Field name="email"  component={Input} label="Электронная почта" validate={email} width={300} height={50}/>
    //         <Button type="primary" htmlType="submit" disabled={submitting} className={styles.submitButton}>Отправить</Button>
    //       </form>
    //     )}
    //   />
    // </div>
  )
}

