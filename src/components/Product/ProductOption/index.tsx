import React from 'react'
import cx from 'classnames'
import { getMetafield } from '@utils/getMetafield'
import { ShopifyProduct, ShopifyProductOption } from '@typings/storefront'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { getPrice } from '@utils/helpers'
import styles from './styles.module.scss'

interface ProductOptionProps {
  product: ShopifyProduct
  option: ShopifyProductOption
  sliderRef: React.MutableRefObject<any>
}

// <button
//     type="button"
//     onClick={() => {
//         if (sliderRef) sliderRef.current.goToImageId(variant.image?.id)
//     }}
//     className={styles.variantColor}
// >
//     {variant.title} | {getMetafield(`variant_color`, variant.metafields)}
// </button>

const optionRenderer = (props: ProductOptionProps) => {
  const {
    option: { name },
  } = props

  switch (name) {
    case `Color`:
      return ColorOption(props)

    default:
      return `default`
  }
}

const ColorOption = (props: ProductOptionProps) => {
  const { option, sliderRef, product } = props

  const colors = getMetafield(`product_colors`, product.metafields)
  if (!colors) return

  const colorMap = JSON.parse(colors)

  return option.values.map(value => {
    return (
      <div key={value} className={cx(styles.optionWrapper, styles.colorOption)}>
        <button type="button" className={styles.color}>
          <span
            style={{ backgroundColor: colorMap[value] || `#FFFFFF` }}
            className={styles.colorBox}
          />
        </button>
        {value}
      </div>
    )
  })
}

const ProductOption = (props: ProductOptionProps) => {
  return <>{optionRenderer(props)}</>
}

export default ProductOption
