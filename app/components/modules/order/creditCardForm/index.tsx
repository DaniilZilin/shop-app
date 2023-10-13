import React, { ChangeEvent } from 'react'

import { Input } from '../../form'
import CardType from './CardType'
import { expirationDateValidator, email as emailValidator } from '../../form/validators'

import { Button } from 'antd'
import styles from './card.module.css'

export interface Props {
  setValues: (value: boolean) => void
}

export default function CreditCard({ setValues }: Props) {
  const cardNumberRef = React.useRef(null)
  const expirationDateRef = React.useRef(null)
  const codeRef = React.useRef(null)

  const [ cardNumber, setCardNumber ] = React.useState<string>("")
  const [ expirationDate, setExpirationDate ] = React.useState<string>("")
  const [ code, setCode ] = React.useState<string>("")
  const [ email, setEmail ] = React.useState("")

  const [ cardNumberError, setCardNumberError ] = React.useState("")
  const [ expirationDateError, setExpirationDateError ] = React.useState("")
  const [ codeError, setCodeError ] = React.useState("")
  const [ emailError, setEmailError ] = React.useState("")

  const [ wasSubmittedOnce, setWasSubmittedOnce ] = React.useState(false)

  React.useEffect(() => {
    // @ts-ignore
    cardNumberRef.current.input.focus()
  }, [])

  const checkValidation = React.useCallback(() => {
    let isValid = true

    if (!cardNumber) {
      setCardNumberError('Field is empty')
      isValid = false
    } else {
      setCardNumberError('')
    }

    if (!expirationDate) {
      setExpirationDateError('Field is empty')
      isValid = false
    } else if (!expirationDateValidator(expirationDate)) {
      setExpirationDateError('Incorrect expiration date')
      isValid = false
    } else {
      setExpirationDateError('')
    }

    if (!code) {
      setCodeError('Field is empty')
      isValid = false
    } else if (code.length < 3) {
      setCodeError('Incorrect code')
      isValid = false
    } else {
      setCodeError('')
    }

    if (!email) {
      setEmailError('Field is empty')
      isValid = false
    } else if (emailValidator(email)) {
      setEmailError('Incorrect email')
      isValid = false
    } else {
      setEmailError('')
    }
    return isValid
  }, [ cardNumber, expirationDate, code, email, setCardNumberError, setExpirationDateError, setCodeError, setEmailError ])

    React.useEffect(() => {
    if (wasSubmittedOnce) {
      checkValidation()
    }
  }, [ wasSubmittedOnce, email, cardNumber, expirationDate, code, email ])

  const handleSubmit = React.useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setWasSubmittedOnce(true)
    const isValid = checkValidation()
    if (isValid) {
      setValues(true)
    }
  }, [ setValues, emailError, setWasSubmittedOnce, checkValidation ])

  const cardNumberChangeHandler = React.useCallback((value: string) => {
    setCardNumber(value)
    if (value.length > 16) {
      // @ts-ignore
      expirationDateRef.current.input.focus()
    }
  }, [ setCardNumber ])

  const expirationDateChangeHandler = React.useCallback((value: string) => {
    const expirationDateRegex = value.replace(/\D/g, '')
    if (expirationDateRegex.length <= 2) {
      setExpirationDate(expirationDateRegex.slice(0, 2))
    } else {
      setExpirationDate(`${expirationDateRegex.slice(0, 2)}/${expirationDateRegex.slice(2, 4)}`)
    }

    if (value.length === 5) {
      // @ts-ignore
      codeRef.current.input.focus()
    }
  }, [ setExpirationDate ])

  const codeChangeHandler = React.useCallback((value: string) => {
    const currentCodeValue = value.replace(/\D/g, '')
    setCode(currentCodeValue)
  }, [ setCode ])

  const emailChangeHandler = React.useCallback((value: string) => {
    setEmail(value)
  }, [ setEmail ])

  return (
    <form onSubmit={handleSubmit}>
      <Input name="cardNumber" label="Номер карты" ref={cardNumberRef} value={cardNumber} onChange={cardNumberChangeHandler} error={cardNumberError} width={300} height={50} maxLength={19} />
      <CardType cardNumberValue={cardNumber} />
      <div className={styles.lowerContainer}>
        <Input name="Месяц/Год" label="Месяц/Год" ref={expirationDateRef} onChange={expirationDateChangeHandler} error={expirationDateError} value={expirationDate} width={150} height={50} maxLength={5} />
        <Input name="code" label="CVC/CVV-код" ref={codeRef} onChange={codeChangeHandler} error={codeError} value={code} width={150} height={50} maxLength={3} />
      </div>
      <Input name="E-mail" label="E-mail" onChange={emailChangeHandler} width={300} height={50} />
      <Button type="primary" htmlType="submit" className={styles.submitButton}>Отправить</Button>
    </form>
  )
}

