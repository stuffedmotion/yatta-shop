import { graphql, Link } from 'gatsby'
import posed from 'react-pose'
import React, { useRef, useState, memo } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import back_arrow from '@assets/images/back_arrow.svg'

import SEO from '@components/seo'
import ProductOption from '@components/Product/ProductOption'
import ProductForm from '@components/Product/ProductForm'
import { ShopifyProduct } from '@typings/storefront'
import Slider from '@components/Slider'
import { getMetafield } from '@utils/getMetafield'
import Helmet from 'react-helmet'
import styles from './styles.module.scss'

interface ProductPageProps {
  data: {
    shopifyProduct: ShopifyProduct
  }
}

const Transition = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: `spring`, stiffness: 400, damping: 15 },
      opacity: { ease: `easeOut`, duration: 800 },
      default: { duration: 300 },
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0 },
  },
})

const ProductPage = ({ data }: ProductPageProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: any
  }>({})
  const product = data.shopifyProduct
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product

  const sliderRef = useRef(null)

  const [variant, setVariant] = useState({ ...initialVariant })

  const handleUpdateOption = (key: string, value: string) => {
    if (key in selectedOptions && selectedOptions[key] === value) return

    setSelectedOptions(prevState => {
      const newOptions = { ...prevState, [key]: value }

      // Get new variant
      const matchedVariant = variants.find(variant =>
        variant.selectedOptions.every(
          option =>
            option.name in newOptions &&
            newOptions[option.name] === option.value
        )
      )

      // Update slider image
      if (sliderRef && matchedVariant) {
        sliderRef.current.goToImageId(matchedVariant.image?.id)
        setTimeout(() => {
          sliderRef.current.goToImageId(matchedVariant.image?.id)
        }, 300)
      }

      setVariant({ ...matchedVariant })

      return newOptions
    })
  }

  const titleArea = (
    <div className={styles.titleArea}>
      <div className={styles.titles}>
        <h2>Phil</h2>
        <h1>{product.title}</h1>
      </div>
      <Link className={styles.back} to="/">
        <img alt="back to shop" src={back_arrow} /> shop
      </Link>
    </div>
  )

  return (
    <Transition>
      <SEO title={product.title} description={product.description} />
      <div className={styles.productWrapper}>
        <div className="hideDesktop">{titleArea}</div>
        <div className={styles.left}>
          <Slider
            ref={sliderRef}
            images={product.images}
            altText={product.title}
          />
        </div>
        <div className={styles.right}>
          <div className="hideMobile">{titleArea}</div>
          {options.map(option => (
            <ProductOption
              key={option.id}
              handleUpdateOption={handleUpdateOption}
              selectedOptions={selectedOptions}
              option={option}
              product={product}
            />
          ))}
        </div>

        {/* <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /> */}
        {/* <ProductForm product={product} /> */}
      </div>
    </Transition>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      ...ProductDetails
    }
  }
`

export default memo(ProductPage)
