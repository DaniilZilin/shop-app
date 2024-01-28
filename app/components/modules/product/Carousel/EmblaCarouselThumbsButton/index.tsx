import React from 'react'

import styles from '../Carousel.module.css'

type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={`styles.embla_thumbs__slide`.concat(
        selected ? `${styles.embla_thumbs__slide__selected}` : ''
      )}
    >
      <button
        onClick={onClick}
        className={styles.embla_thumbs__slide__button}
        type="button"
      >
        <div className={styles.embla_thumbs__slide__number}>
          <span>{index + 1}</span>
        </div>
        <img
          className={styles.embla_thumbs__slide__img}
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  )
}
