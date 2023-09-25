import React, { ChangeEvent } from 'react'
import MainLayout from '../../../../Layout'

import { Input, PhoneNumber } from '../../form'
import { email as emailValidator } from '../../form/validators'
import styles from '../creditCardForm/card.module.css'
import { Button } from 'antd'

export interface Props {
  setUserId: (value: boolean) => void
}

export default function UserForm({ setUserId }: Props) {
  const emailRef = React.useRef(null)
  const firstNameRef = React.useRef(null)
  const lastNameRef = React.useRef(null)
  const phoneNumberRef = React.useRef(null)

  const [ email, setEmail ] = React.useState("")
  const [ phoneNumber, setPhoneNumber ] = React.useState<number>(1)
  const [ firstName, setFirstName ] = React.useState("")
  const [ lastName, setLastName ] = React.useState("")
  const [ wasSubmittedOnce, setWasSubmittedOnce ] = React.useState(false)

  const [ emailError, setEmailError ] = React.useState<string | null>(null)
  const [ firstNameError, setFirstNameError] = React.useState<string | null>(null)
  const [ lastNameError, setLastNameError] = React.useState<string | null>(null)
  const [ phoneNumberError, setPhoneNumberError ] = React.useState<string | null>(null)

  const checkValidation = React.useCallback(() => {
    let isValid = true

    if (!firstName) {
      setFirstNameError('Field is empty')
      isValid = false
    } else if (lastName.match(/[\d=+()\]\[]+/g)) {
      setFirstNameError('Field contains restricted symbols')
      isValid = false
    } else {
      setFirstNameError(null)
    }
    console.log(firstName)
    console.log(isValid)

    if (!lastName) {
      setLastNameError('Field is empty')
      isValid = false
    } else if (lastName.match(/[\d=+()\]\[]+/g)) {
      setLastNameError('Field contains restricted symbols')
      isValid = false
    } else {
      setLastNameError(null)
    }
    console.log(lastName)
    console.log(isValid)
    if (!email) {
      setEmailError('Field is empty')
      isValid = false
    } else if (!emailValidator(email)) {
      setEmailError('E-mail is not valid')
      isValid = false
    } else {
      setEmailError(null)
    }
    console.log(email)
    console.log(isValid)

    // if (phoneNumber < 20) {
    //   setPhoneNumberError('Must be a valid phone number"')
    //   isValid = false
    // } else {
    //   setPhoneNumberError(null)
    // }
    return isValid
  }, [ setFirstNameError, setEmailError, setLastNameError, setPhoneNumberError, phoneNumber, lastName, email, firstName ])

  React.useEffect(() => {
    // @ts-ignore
    emailRef.current.input.focus()
  }, [])

  React.useEffect(() => {
    if (wasSubmittedOnce) {
      checkValidation()
    }
  }, [ wasSubmittedOnce, email, firstName, lastName, setUserId ])

  const handleSubmit = React.useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setWasSubmittedOnce(true)
    const isValid = checkValidation()
    if (isValid) {
      setUserId(true)
    }
  }, [ setUserId, emailError, setWasSubmittedOnce, checkValidation ])

  const emailHandler = React.useCallback((value: string) => {
    setEmail(value)
  }, [ setEmail ])

  const handleChangeFirstName = React.useCallback((value: string) => {
    setFirstName(value)
  }, [ setFirstName ])

  const handleChangeLastName = React.useCallback((value: string) => {
    setLastName(value)
  }, [ setLastName ])

  const handlePhoneNumber = React.useCallback((value: string) => {
    const phoneNumberRegex: string | null = String(value.match(/\d/g))
    setPhoneNumber(Number(phoneNumberRegex.length))
  }, [ setPhoneNumber ])

  const handleBlurEmail = React.useCallback(() => {
  }, [ email ])

  const handleBlurFirstName = React.useCallback(() => {
    const firstNameRegex = firstName.replace(/^[а-яА-ЯёЁ0-9\w]+|[^\s-][а-яА-ЯёЁ0-9\w]+/g, (match) => `${match[0].toUpperCase()}${match.slice(1)}`)
    setFirstName(firstNameRegex)
  }, [ setFirstName, firstName ])

  const handleBlurLastName = React.useCallback(() => {
    const lastNameRegex = lastName.replace(/^[а-яА-ЯёЁ0-9\w]+|[^\s-][а-яА-ЯёЁ0-9\w]+/g, (match) => `${match[0].toUpperCase()}${match.slice(1)}`)
    setLastName(lastNameRegex)
  }, [ setLastName, lastName ])

  return (
    <MainLayout>
      <>
        <h1>
          Данные о покупателе
        </h1>
        <form onSubmit={handleSubmit}>
          <Input name="email" label="E-mail" onChange={emailHandler} error={emailError} ref={emailRef} onBlur={handleBlurEmail} value={email} width={250} height={50} maxLength={50} />
          {/*<PhoneNumber />*/}
          <Input name="firstName" label="Имя" error={firstNameError} onChange={handleChangeFirstName} onBlur={handleBlurFirstName} value={firstName} ref={firstNameRef} width={250} height={50} maxLength={20} />
          <Input name="lastName" label="Фамилия" error={lastNameError} onChange={handleChangeLastName} onBlur={handleBlurLastName} value={lastName} ref={lastNameRef} width={250} height={50} maxLength={70} />
          <Button type="primary" htmlType="submit" className={styles.submitButton}>Отправить</Button>
        </form>
      </>
    </MainLayout>
  )
}