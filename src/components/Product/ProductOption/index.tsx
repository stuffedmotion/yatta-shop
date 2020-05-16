import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { getMetafield } from '@utils/getMetafield'
import { ShopifyProduct, ShopifyProductOption } from '@typings/storefront'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { getPrice } from '@utils/helpers'
import styles from './styles.module.scss'
import useDimensions from 'react-use-dimensions'
import Draggable from 'react-draggable'

interface ProductOptionProps {
  product: ShopifyProduct
  option: ShopifyProductOption
  selectedOptions: { [key: string]: string }
  handleUpdateOption: (key: string, value: string) => void
}

const optionRenderer = (props: ProductOptionProps) => {
  const {
    option: { name },
  } = props

  switch (name) {
    case `Color`:
      return ColorOption(props)

    case `Size`:
      return SizeOption(props)

    default:
      return `default`
  }
}

const SizeOption = (props: ProductOptionProps) => {
  const { option, handleUpdateOption, selectedOptions, product } = props
  const [ref, { x, y, width }] = useDimensions()

  console.log(width)

  return (
    <div className={cx(styles.optionWrapper, styles.sizeOption)}>
      <div className={styles.sizeSlider}>
        <Draggable
          onDrag={(e, data) => console.log(data.x / (width - 30))}
          grid={[(width - 30) / 3, 0]}
          axis="x"
          positionOffset={{ x: -5, y: 0 }}
          bounds={`.${styles.sizeSliderTrack}`}
        >
          <div className={styles.sizeHandle} />
        </Draggable>
        <div ref={ref} className={styles.sizeSliderTrack}>
          <div className={styles.sizeDot} />
          <div className={styles.sizeDot} />
          <div className={styles.sizeDot} />
          <div className={styles.sizeDot} />
        </div>
      </div>
      {/* {option.values.map(value => {
        return (
          <button
            key={value}
            type="button"
            // onClick={() => handleUpdateOption(option.name, value)}
            className={styles.sizeDot}
          >
            <div>{value}</div>
          </button>
        )
      })} */}
    </div>
  )
}

const ColorOption = (props: ProductOptionProps) => {
  const { option, handleUpdateOption, selectedOptions, product } = props

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
            onClick={() => handleUpdateOption(option.name, value)}
            className={cx(styles.color, {
              [styles.active]: value === selectedOptions[option.name],
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

const getDefaultValue = (option: ShopifyProductOption) => {
  const { name, values } = option

  const defaults = {
    Size: `M`,
    Color: `white`,
  } as { [key: string]: any }

  if (name in defaults && values.includes(defaults[name])) return defaults[name]

  return values[0]
}

const ProductOption = (props: ProductOptionProps) => {
  const {
    option: { name },
    handleUpdateOption,
  } = props

  // set default
  useEffect(() => {
    handleUpdateOption(name, getDefaultValue(props.option))
  }, [])

  return <>{optionRenderer(props)}</>
}

export default ProductOption
