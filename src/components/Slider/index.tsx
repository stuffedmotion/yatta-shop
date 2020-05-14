/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import { ShopifyProductImages } from '@typings/storefront'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'gatsby-image'
import Slick, { Settings } from 'react-slick-teehouse'
import styles from './styles.module.scss'

interface SliderProps {
  altText: string
  images: ShopifyProductImages[]
}

const Slider = ({ images, altText }: SliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => goToSlide(slideIndex), 20)
    return () => clearTimeout(timer)
  }, [slideIndex])

  const slickConfig = {
    dots: false,
    infinite: false,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: newId => {
      setSlideIndex(newId)
    },
  } as Settings

  const goToSlide = (id: number) => {
    if (sliderRef) {
      setSlideIndex(id)
      sliderRef.current.slickGoTo(id)
    }
  }

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
          <button
            className={cx(styles.smallImage, {
              [styles.active]: idx === slideIndex,
            })}
            type="button"
            onClick={() => goToSlide(idx)}
          >
            <Image
              fluid={image.localFile.childImageSharp.fluid}
              key={image.id}
              alt={altText}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Slider
