import { ShopifyProductMetafield } from '@typings/storefront'

const META_DEFAULTS = {
  color: `#FFFFFF`,
  size: `Large`,
} as any

export const getMetafield = (
  key: string,
  metafields: Array<ShopifyProductMetafield>
) => {
  if (metafields && Array.isArray(metafields)) {
    const findMetafield = metafields.find(field => field.key === key)
    if (findMetafield) return findMetafield.value
  }

  return META_DEFAULTS[key] || ``
}
