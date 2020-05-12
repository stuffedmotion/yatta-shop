import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Query as allShopifyCollectionQuery } from '@typings/storefront'
import SEO from '@components/seo'
import CharacterGrid from '@components/Character/CharacterGrid'

const IndexPage = () => {
  const { allShopifyCollection }: allShopifyCollectionQuery = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(
          filter: {title: {regex: "/\\bCharacter\\b/"}}
          sort: { fields: title, order: DESC }
        ) {
          ...CollectionDetailsAll
        }
      }
    `
  )

  return (
    <>
      <SEO title="teehouse" keywords={[`cute`, `t-shirts`, `animals`]} />
      <CharacterGrid collections={allShopifyCollection} />
    </>
  )
}

export default IndexPage
