/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import { ShopifyProductImages } from '@typings/storefront'
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import Image from 'gatsby-image'
import Slick, { Settings } from 'react-slick-teehouse'
import styles from './styles.module.scss'

interface SliderProps {
  ref: any
  altText: string
  images: ShopifyProductImages[]
}

const Slider: React.SFC<SliderProps> = forwardRef(
  ({ images, altText }, ref) => {
    const [slideIndex, setSlideIndex] = useState(0)
    const sliderRef = useRef(null)

    useEffect(() => {
      const timer = setTimeout(() => goToSlideId(slideIndex), 20)
      return () => clearTimeout(timer)
    }, [slideIndex])

    const slickConfig = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (_oldId, newId) => {
        setSlideIndex(newId)
      },
      afterChange: newId => {
        setSlideIndex(newId)
      },
    } as Settings

    const goToSlideId = (id: number) => {
      if (sliderRef) {
        setSlideIndex(id)
        sliderRef.current.slickGoTo(id)
      }
    }

    const goToImageId = (imageId: string) => {
      const imageIndex = images.findIndex(image => image.id === imageId)
      if (imageIndex !== -1) goToSlideId(imageIndex)
    }

    useImperativeHandle(ref, () => {
      return {
        goToImageId,
      }
    })

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
              onClick={() => goToSlideId(idx)}
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
)

export default Slider
