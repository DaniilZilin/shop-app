import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { Item } from '../../../../types'
import { Thumb } from './EmblaCarouselThumbsButton'

import styles from './Carousel.module.css'

export interface Props {
  good: Item
}

export default function Carousel({ good }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({})
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const images: string[] = Object.keys(good.photos)

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaMainRef}>
        <div className={styles.embla__container}>
          {good.photos.map((item, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__number}>
                <span>{index + 1}</span>
              </div>
              <img
                className={styles.embla__slide__img}
                src={`/img/items_images/${item.photo}.jpg`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla_thumbs}>
        <div className={styles.embla_thumbs__viewport} ref={emblaThumbsRef}>
          <div className={styles.embla_thumbs__container}>
            {good.photos.map((item, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={`/img/items_images/${item.photo}.jpg`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}