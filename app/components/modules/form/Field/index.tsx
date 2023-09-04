import React from 'react'

import styles from './Field.module.css'
import Image from 'next/image'

export interface Props {
  meta: any,
  input: any,
  label: string,
  children: React.ReactNode,
}

export default function Field({ meta, input, label, children }: Props) {
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

  // React.useEffect(() => {
  //   if (input.name === "cardNumber") {
  //     getCardType(input.value)
  //   }
  // }, [input.value])

  // const hasError = meta.error && meta.submitFailed

  return (
    // <div className={classNames(styles.formGroup, { [styles.active]: hasError})}>
    <div>
      <div>{label}</div>
       {children}
      {/*<p>{hasError ? meta.error : null}</p>*/}
        {imageName && (
        <div>
          <Image src={`/img/card_type_images/logo-${imageName}.svg`} width="40" height="40" alt="" className={styles.logoStyles} />
        </div>
      )}
    </div>
  )
}
