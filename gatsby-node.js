const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for all products in Shopify
  const products = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)

  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  products.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/product/${node.handle}`,
      component: path.resolve(`./src/templates/ProductPage/index.tsx`),
      context: {
        handle: node.handle,
      },
    })
  })

  // Query for all products in Shopify
  const collections = await graphql(`
    query {
      allShopifyCollection {
        edges {
          node {
            handle
            title
          }
        }
      }
    }
  `)

  collections.data.allShopifyCollection.edges.forEach(({ node }) => {
    if(node.title.includes(`Character-`))
      createPage({
        path: `/character/${node.handle}`,
        component: path.resolve(`./src/templates/CharacterPage/index.tsx`),
        context: {
          collection: node,
          handle: node.handle,
        },
      })
  })
}
