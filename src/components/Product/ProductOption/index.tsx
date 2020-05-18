import React, { useEffect, memo } from 'react'
import cx from 'classnames'
import { getMetafield } from '@utils/getMetafield'
import { ShopifyProduct, ShopifyProductOption } from '@typings/storefront'
import acorn from '@assets/images/acorn.svg'
import chip_xs from '@assets/images/chip_xs.svg'
import chip_s from '@assets/images/chip_s.svg'
import chip_m from '@assets/images/chip_m.svg'
import chip_xl from '@assets/images/chip_xl.svg'
import line from '@assets/images/line.svg'
import Draggable from 'react-draggable'
import useDimensions from 'react-use-dimensions'
import posed from 'react-pose'
import styles from './styles.module.scss'

interface ProductOptionProps {
  product: ShopifyProduct
  option: ShopifyProductOption
  selectedOptions: { [key: string]: string }
  handleUpdateOption: (key: string, value: string) => void
}

const HANDLE_WIDTH = 50
const CHIPMUNKS = [chip_xs, chip_s, chip_m, chip_xl]

const optionRenderer = (props: ProductOptionProps) => {
  const {
    option: { name },
  } = props

  switch (name) {
    case `Color`:
      return ColorOption(props)

    case `Size`:
      return SizeOption(props)

    case `Title`:
      return null

    default:
      return <h2>Missing option: {name}</h2>
  }
}

const ChipMunk = posed.img({
  bounce: {
    scale: 1,
    transition: {
      scale: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 400 },
    },
  },
  initial: {
    scale: 0.8,
    transition: {
      default: { duration: 0 },
    },
  },
})

const SizeOption = (props: ProductOptionProps) => {
  const { option, handleUpdateOption, selectedOptions } = props
  const [ref, { width }] = useDimensions()

  const dragBasisLength = width - HANDLE_WIDTH
  const snapLength = Math.round(dragBasisLength / (option.values.length - 1))
  const snapPercent = snapLength / dragBasisLength

  let currentOptionIndex = selectedOptions[option.name]
    ? option.values.findIndex(value => value === selectedOptions[option.name])
    : 0

  if (currentOptionIndex === -1) currentOptionIndex = 0

  const updateColor = (optionIndex: number) =>
    handleUpdateOption(option.name, option.values[optionIndex])

  const currentChipmunkIndex = Math.round(
    0 +
      ((CHIPMUNKS.length - 1 - 0) * (currentOptionIndex - 0)) /
        (option.values.length - 1 - 0)
  )
  const currentChipmunk = CHIPMUNKS[currentChipmunkIndex]

  return (
    <div className={cx(styles.optionWrapper, styles.sizeOption)}>
      <div className={styles.sizeSlider}>
        <img alt="" src={line} className={styles.sizeLine} />
        <Draggable
          onDrag={(_e, data) => {
            updateColor(Math.round(data.x / dragBasisLength / snapPercent))
          }}
          grid={[snapLength, 0]}
          axis="x"
          position={{
            x: snapLength * currentOptionIndex,
            y: 0,
          }}
          positionOffset={{ x: -16, y: -17 }}
          bounds={`.${styles.sizeSliderTrack}`}
        >
          <div className={styles.sizeHandle}>
            <img draggable={false} src={acorn} alt="Select size" />
            <div
              className={cx(styles.sizeInfo, {
                [styles.first]: currentOptionIndex === 0,
                [styles.last]: currentOptionIndex === option.values.length - 1,
              })}
            >
              <div className={styles.sizingChart}>sizing chart</div>
              <div className={styles.bubble}>
                size: <strong>{option.values[currentOptionIndex]}</strong>
                <div className={styles.arrowDown} />
              </div>
            </div>
          </div>
        </Draggable>
        <div ref={ref} className={styles.sizeSliderTrack}>
          {option.values.map((value, idx) => (
            <button
              aria-label={`Size ${value}`}
              type="button"
              onClick={() => updateColor(idx)}
              onKeyDown={e => {
                if (e.keyCode === 13) updateColor(idx)
              }}
              tabIndex={10 + idx}
              key={value}
              className={styles.sizeDot}
            />
          ))}
        </div>
      </div>
      <div className={styles.sizeChipmunk}>
        {CHIPMUNKS.map(chip => (
          <ChipMunk
            initialPose="initial"
            key={chip}
            pose={chip === currentChipmunk ? `bounce` : `initial`}
            poseKey={chip}
            className={cx({ [styles.active]: chip === currentChipmunk })}
            alt=""
            src={chip}
          />
        ))}
      </div>
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
      {option.values.map((value, idx) => {
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleUpdateOption(option.name, value)}
            className={cx(styles.color, {
              [styles.active]: value === selectedOptions[option.name],
            })}
            tabIndex={20 + idx}
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

export default memo(ProductOption)
