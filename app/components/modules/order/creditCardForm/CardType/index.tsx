import React from 'react'
import Image from 'next/image'

import styles from './cardType.module.css'

export interface Props {
  cardNumberValue: string
}

export default function CardType({ cardNumberValue }: Props) {
  const [ cardNumberImage, setCardNumberImage ] = React.useState("")

  React.useEffect(() => {
    if (cardNumberValue.match("^4+")) {
      setCardNumberImage("visa")
    } else if (cardNumberValue.match("^5[1-5]+"))  {
      setCardNumberImage("mastercard")
    } else if (cardNumberValue.match("^2+")) {
      setCardNumberImage("mir")
    } else if (cardNumberValue.match("^35[2-8][0-9]")) {
      setCardNumberImage("jcb")
    } else {
      setCardNumberImage("")
    }
  }, [ cardNumberValue, setCardNumberImage ])

  return (
    <>
      {cardNumberImage &&
        <div>
        <Image src={`/img/card_type_images/logo-${cardNumberImage}.svg`} alt='' width={50} height={50} className={styles.logoStyles} />
      </div>}
    </>
  )
}