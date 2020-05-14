/* eslint-disable react/jsx-props-no-spreading */

import { ShopifyProductImages } from '@typings/storefront'
import React, { useContext, useState, useEffect } from 'react'
import Image from 'gatsby-image'
import Slick from 'react-slick'
import styles from './styles.module.scss'

interface SliderProps {
  altText: string
  images: ShopifyProductImages[]
}

const Slider = ({ images, altText }: SliderProps) => {
  const [state, setState] = useState({ mobileOpen: false, cartOpen: false })

  useEffect(() => {}, [])

  const slickConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <Slick className={styles.slider} {...slickConfig}>
      {images.map(image => (
        <Image
          className={styles.sliderImage}
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={altText}
        />
      ))}
    </Slick>
  )
}

export default Slider
