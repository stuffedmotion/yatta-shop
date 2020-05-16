import { graphql, Link } from 'gatsby'
import posed from 'react-pose'
import React, { useRef, useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useDeepEffect from 'use-deep-compare-effect'

import SEO from '@components/seo'
import ProductOption from '@components/Product/ProductOption'
import ProductForm from '@components/Product/ProductForm'
import { ShopifyProduct } from '@typings/storefront'
import Slider from '@components/Slider'
import { getMetafield } from '@utils/getMetafield'
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
  const sliderRef = useRef(null)
  const isFirstRun = useRef(true)

  const handleUpdateOption = (key: string, value: string) => {
    setSelectedOptions(prevState => ({ ...prevState, [key]: value }))
  }

  useDeepEffect(() => {
    if (Object.keys(selectedOptions).length === 0) return

    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const matchedVariant = product.variants.find(variant =>
      variant.selectedOptions.every(
        option =>
          option.name in selectedOptions &&
          selectedOptions[option.name] === option.value
      )
    )
    if (sliderRef && matchedVariant) {
      sliderRef.current.goToImageId(matchedVariant.image?.id)
      setTimeout(() => {
        sliderRef.current.goToImageId(matchedVariant.image?.id)
      }, 300)
    }
  }, [selectedOptions])

  return (
    <Transition>
      <SEO title={product.title} description={product.description} />
      <div className={styles.productWrapper}>
        <div className={styles.left}>
          <Slider
            ref={sliderRef}
            images={product.images}
            altText={product.title}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.titleArea}>
            <div className={styles.titles}>
              <h2>Phil</h2>
              <h1>blowfish t-shirt</h1>
            </div>
            <Link className={styles.back} to="/">
              back to shop
            </Link>
          </div>
          {product.options.map(option => (
            <ProductOption
              key={option.id}
              handleUpdateOption={handleUpdateOption}
              selectedOptions={selectedOptions}
              option={option}
              product={product}
            />
          ))}
        </div>

        {product.title}
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

export default ProductPage
