import React from 'react'
import classNames from 'classnames'

import styles from './Field.module.css'
import Image from 'next/image'

export interface Props {
  meta: any,
  input: any,
  children: any
}

export default function Field({ meta, input, children }: Props) {
  const [ imageName, setImageName ] = React.useState<string>('')

  const getCardType = React.useCallback((value: string) => {
    if (value.match('^4+')) {
      setImageName('visa')
    } else if (value.match('^5[1-5]+'))  {
      setImageName('mastercard')
    } else if (value.match('^2+')) {
      setImageName('mir')
    } else if (value.match('^35[2-8][0-9]')) {
      setImageName('jcb')
    } else {
      setImageName('')
    }
  }, [ imageName, setImageName])

    React.useEffect(() => {
      if (input.name === "cardNumber") {
        getCardType(input.value)
      }
    })

  const hasError = meta.error && meta.submitFailed

  return (
    <div className={classNames(styles.formGroup, { [styles.active]: hasError})}>
      {children}
      <p>{hasError ? meta.error : null}</p>
        {imageName && (
        <div>
          <Image src={`/img/card_type_images/logo-${imageName}.svg`} width="40" height="40" alt="" className={styles.logoStyles} />
        </div>
      )}
    </div>
  )
}
