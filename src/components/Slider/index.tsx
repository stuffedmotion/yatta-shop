/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import { ShopifyProductImages } from '@typings/storefront'
import React, { useContext, useState, useEffect, useRef } from 'react'
import Image from 'gatsby-image'
import Slick, { Settings } from 'react-slick'
import styles from './styles.module.scss'

interface SliderProps {
  altText: string
  images: ShopifyProductImages[]
}

const Slider = ({ images, altText }: SliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0)

  const sliderRef = useRef(null)

  useEffect(() => {}, [])

  const slickConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setSlideIndex(next),
  } as Settings

  return (
    <div className={styles.slider}>
      <Slick ref={sliderRef} className={styles.slick} {...slickConfig}>
        {images.map(image => (
          <Image
            className={styles.sliderImage}
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={altText}
          />
        ))}
      </Slick>
      <div className={styles.imagePicker}>
        {images.slice(0, 5).map((image, idx) => (
          <Image
            className={cx(styles.smallImage, {
              [styles.active]: idx === slideIndex,
            })}
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={altText}
            onClick={() => set}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
