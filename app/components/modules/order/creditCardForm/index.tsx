import React, {ChangeEvent} from 'react'
import { Field, Form } from 'react-final-form'
import fetcher from '../../../../utils/fetcher'

import { Input } from '../../form'
import { cardNumber, cvcCode, expirationDate } from '../../form/parsers'
import { expDate, email, cardNum } from '../../form/validators'

import { Button } from 'antd';
import styles from './card.module.css'

export interface Props {
  setValues: (value: boolean) => void
}

export default function CreditCard({ setValues }: Props) {
  const cardNumberRef = React.useRef(null)
  const codeRef = React.useRef(null)
  const expirationDate2 = React.useRef(null)

  const onSubmit = React.useCallback(async (values: Record<string, string>, form: any) => {
    setValues(true)
  }, [])

  React.useEffect(() => {
    // @ts-ignore
    cardNumberRef.current.input.focus()
  },[])

  const [rerender, setRerender] = React.useState(false);

  React.useEffect(() => {
    // forceUpdate()
    setRerender(!rerender)
    if (cardNumberRef.current.input.textLength >= 19) {
      expirationDate2.current.input.focus()
    }
    if (expirationDate2.current.input.textLength >= 5) {
      codeRef.current.input.focus()
    }
  }, [ rerender, setRerender ])


  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, submitting}) => (
        <form onSubmit={handleSubmit} className={styles.mainBlock}>
          <Field name="cardNumber" ref={cardNumberRef} component={Input} label="Номер карты" parse={cardNumber} width={300} height={50} maxLength={23}/>
          <div className={styles.lowerContainer}>
            <Field name="expirationDate" ref={expirationDate2} component={Input} label="Месяц/Год" parse={expirationDate} validate={expDate} width={150} height={50} maxLength={5}/>
            <Field name="code" ref={codeRef} component={Input} label="CVC/CVV-код" parse={cvcCode} width={150} height={50} maxLength={3}/>
          </div>
          <Field name="email" component={Input} label="Электронная почта" validate={email} width={300} height={50}/>
          <Button type="primary" htmlType="submit" disabled={submitting} className={styles.submitButton}>Отправить</Button>
        </form>
        )}
      />
    </div>
  )
}

