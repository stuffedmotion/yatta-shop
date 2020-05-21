import cx from 'classnames'
import { graphql, Link } from 'gatsby'
import { AnimationConfig } from 'lottie-web'
import Helmet from 'react-helmet'
import React, { useRef, useState, memo, useContext, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import back_arrow from '@assets/images/back_arrow.svg'
import cartAnim from '@assets/lottie/cart.json'
import SEO from '@components/seo'
import ProductOption from '@components/Product/ProductOption'
import ProductForm from '@components/Product/ProductForm'
import Slider from '@components/Slider'
import StoreContext from '@context/StoreContext'
import { ShopifyProduct } from '@typings/storefront'
import { getMetafield } from '@utils/getMetafield'
import useLottie from '@utils/useLottie'
import styles from './styles.module.scss'

interface ProductPageProps {
  data: {
    shopifyProduct: ShopifyProduct
  }
}

const ProductPage = ({ data }: ProductPageProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: any
  }>({})
  const product = data.shopifyProduct
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product

  const sliderRef = useRef(null)
  const [variant, setVariant] = useState({ ...initialVariant })
  const [shouldOpenCart, setShouldOpenCart] = useState(false)

  const {
    addVariantToCart,
    openCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const handleUpdateOption = (
    key: string,
    value: string,
    updateSlider = false
  ) => {
    if (key in selectedOptions && selectedOptions[key] === value) return

    setSelectedOptions(prevState => {
      const newOptions = { ...prevState, [key]: value }

      // Get new variant
      const matchedVariant = variants.find(variant =>
        variant.selectedOptions.every(
          option =>
            option.name in newOptions &&
            newOptions[option.name] === option.value
        )
      )

      // Update slider image
      if (updateSlider && sliderRef && matchedVariant) {
        sliderRef.current.goToImageId(matchedVariant.image?.id)
        setTimeout(() => {
          sliderRef.current.goToImageId(matchedVariant.image?.id)
        }, 300)
      }

      setVariant({ ...matchedVariant })

      return newOptions
    })
  }

  useEffect(() => {
    if (adding) return setShouldOpenCart(true)
    if (!adding && shouldOpenCart) {
      setTimeout(() => {
        setShouldOpenCart(false)
        openCart()
      }, 800)
    }
  }, [adding, shouldOpenCart])

  const titleArea = (
    <div className={styles.titleArea}>
      <div className={styles.titles}>
        <h2>Phil</h2>
        <h1>{product.title}</h1>
      </div>
      <Link className={styles.back} to="/">
        <img alt="back to shop" src={back_arrow} /> shop
      </Link>
    </div>
  )

  const cartLottieConfig = {
    animationData: cartAnim,
    name: `cartAdd`,
    autoplay: false,
    loop: false,
    rendererSettings: {
      preserveAspectRatio: `xMinYMin slice`,
    },
  } as Partial<AnimationConfig>

  const { Lottie, anim } = useLottie(cartLottieConfig, {
    className: styles.cartLottie,
  })

  const handleAddToCart = () => {
    if (variant.shopifyId && !adding) {
      anim.goToAndPlay(0, true)
      if (variant.shopifyId) addVariantToCart(variant.shopifyId, `1`)
    }
  }

  return (
    <div>
      <SEO title={product.title} description={product.description} />
      <div className={styles.productWrapper}>
        <div className="hideDesktop">{titleArea}</div>
        <div className={styles.left}>
          <Slider
            ref={sliderRef}
            images={product.images}
            altText={product.title}
          />
        </div>
        <div className={styles.right}>
          <div className="hideMobile">{titleArea}</div>
          {options.map(option => (
            <ProductOption
              key={option.id}
              handleUpdateOption={handleUpdateOption}
              selectedOptions={selectedOptions}
              option={option}
              product={product}
            />
          ))}
          <button
            className={cx(styles.addToCart, {
              [styles.disableAdd]: !variant.shopifyId,
            })}
            type="button"
            onClick={handleAddToCart}
          >
            {Lottie}
            <span>{variant.shopifyId ? `add to cart` : `unavailable`}</span>
          </button>
        </div>

        {/* <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /> */}
        {/* <ProductForm product={product} /> */}
      </div>
    </div>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      ...ProductDetails
    }
  }
`

export default memo(ProductPage)
