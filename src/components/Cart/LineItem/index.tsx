import React, { useContext } from 'react'

import StoreContext from '@context/StoreContext'
import { Wrapper } from './styles'

const LineItem = (props: any) => {
  const { line_item } = props

  const { removeLineItem } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      height="60px"
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        (option: { name: string; value: string }) =>
          `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(line_item.id)
  }

  return (
    <Wrapper>
      {variantImage}
      <p>
        {line_item.title}
        {`  `}
        {line_item.variant.title}
      </p>
      {selectedOptions}
      {line_item.quantity}
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </Wrapper>
  )
}

export default LineItem
