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

export const COLLECTION_DETAILS_FRAGMENT_ALL = graphql`
  fragment CollectionDetailsAll on ShopifyCollectionConnection {
    edges {
      node {
        ...CollectionDetails
      }
    }
  }
`
export const PRODUCT_DETAILS_FRAGMENT = graphql`
  fragment ProductDetails on ShopifyProduct {
    title
    handle
    productType
    description
    descriptionHtml
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
export const COLLECTION_DETAILS_FRAGMENT = graphql`
  fragment CollectionDetails on ShopifyCollection {
    title
    handle
    description
    descriptionHtml
    image {
      id
      localFile {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
    products {
      ...ProductDetails
    }
  }
`
