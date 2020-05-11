import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Query as allShopifyProductQuery } from '@typings/storefront'
import SEO from '@components/seo'
import ProductGrid from '@components/Product/ProductGrid'
import posed from 'react-pose'

const IndexPage = () => {
  const { allShopifyProduct }: allShopifyProductQuery = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          ...ProductDetailsAll
        }
      }
    `
  )

  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <ProductGrid products={allShopifyProduct} />
      <Link to="/page-2/">Go to page 2</Link>
    </>
  )
}

export default IndexPage
