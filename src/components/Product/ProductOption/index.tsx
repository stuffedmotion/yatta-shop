import React, { useState } from 'react'
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


// const updateColor = (color: string) => {
//   const matchedVariant = product.variants.find(variant =>
//     variant.selectedOptions.find(
//       option => option.name === `Color` && option.value === color
//     )
//   )
//   if (sliderRef && matchedVariant)
//     sliderRef.current.goToImageId(matchedVariant.image?.id)


// UPDATE STATE AND IAMGE SLIDER FROM PRODUCT PAGE FOR ALL VARIANTS

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

  const [selectedColor, setSelectedColor] = useState(option.values[0])

    setSelectedColor(color)
  }

  const colors = getMetafield(`product_colors`, product.metafields)
  if (!colors) return

  const colorMap = JSON.parse(colors)
  return (
    <div className={cx(styles.optionWrapper, styles.colorOption)}>
      {option.values.map(value => {
        return (
          <button
            key={value}
            type="button"
            onClick={() => updateColor(value)}
            className={cx(styles.color, {
              [styles.active]: value === selectedColor,
            })}
          >
            <div
              style={{ backgroundColor: colorMap[value] || `#FFFFFF` }}
              className={styles.colorBox}
            />
            <div>{value}</div>
          </button>
        )
      })}
    </div>
  )
}

const ProductOption = (props: ProductOptionProps) => {
  return <>{optionRenderer(props)}</>
}

export default ProductOption
