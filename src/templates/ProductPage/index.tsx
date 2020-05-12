import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import SEO from '@components/seo'
import ProductForm from '@components/ProductForm'
import { ShopifyProduct } from '@typings/storefront'
import posed from 'react-pose'

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
      y: { type: 'spring', stiffness: 400, damping: 15 },
      opacity: { ease: 'easeOut', duration: 800 },
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
  const product = data.shopifyProduct
  return (
    <Transition>
      <SEO title={product.title} description={product.description} />
      <div>
        {product.images.map(image => (
          <Image
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={product.title}
            style={{ height: `200px` }}
          />
        ))}
        {product.title}
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        <ProductForm product={product} />
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
