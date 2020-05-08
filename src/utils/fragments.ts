import { graphql } from 'gatsby'

export const PRODUCT_DETAILS_FRAGMENT_ALL = graphql`
  fragment ProductDetailsAll on ShopifyProductConnection {
    edges {
      node {
        ...ProductDetails
      }
    }
  }
`
export const PRODUCT_DETAILS_FRAGMENT = graphql`
  fragment ProductDetails on ShopifyProduct {
    id
    title
    handle
    productType
    description
    descriptionHtml
    shopifyId
    metafields {
      key
      value
    }
    options {
      id
      name
      values
    }
    variants {
      id
      title
      price
      availableForSale
      shopifyId
      selectedOptions {
        name
        value
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images {
      originalSrc
      id
      localFile {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }
`
