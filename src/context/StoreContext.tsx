import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'

type StoreContext = {
  addVariantToCart(variantId: string, quantity: string): void
  removeLineItem(lineItemID: string): void
  updateLineItem(lineItemID: string, quantity: string): void
  openCart(): void
  closeCart(): void
  store: StoreStateProps
}

interface ContextProviderProps {
  children: any
}

interface StoreStateProps {
  client: Partial<Client.Client>
  adding: boolean
  checkout: any
  products: Array<any>
  shop: any
  cartOpen: boolean
}

const StoreContext = React.createContext<StoreContext | null>(null)

const clientBuild = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.SHOP_NAME}.myshopify.com`,
})

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const initialStoreState = {
    client: clientBuild,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
    cartOpen: false,
  } as StoreStateProps

  const [store, updateStore] = useState(initialStoreState)

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== `undefined`
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(`shopify_checkout_id`)
        : null

      const setCheckoutInState = (checkout: Client.Cart) => {
        if (isBrowser) {
          localStorage.setItem(`shopify_checkout_id`, checkout.id.toString())
        }

        updateStore(prevState => ({ ...prevState, checkout }))
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = (id: string) =>
        store.client.checkout.fetch(id) as any

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)

          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem(`shopify_checkout_id`, null)
        }
      }

      const newCheckout = await createNewCheckout()
      setCheckoutInState(newCheckout)
    }

    initializeCheckout()
  }, [store.client.checkout])

  return (
    <StoreContext.Provider
      value={{
        store,
        addVariantToCart: (variantId: string, quantity: string) => {
          if (variantId === `` || !quantity) {
            console.error(`Both a size and quantity are required.`)
            return
          }

          updateStore(prevState => ({ ...prevState, adding: true }))

          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) },
          ] as any

          // TODO TEMP FIX FOR PREVIEW
          updateStore(prevState => ({
            ...prevState,
            adding: false,
          }))

          return store.client.checkout
            .addLineItems(store.checkout.id, lineItemsToUpdate)
            .then(checkout => {
              updateStore(prevState => ({
                ...prevState,
                checkout,
                adding: false,
              }))
            })
        },
        removeLineItem: (lineItemID: string) =>
          store.client.checkout
            .removeLineItems(store.checkout.id, [lineItemID])
            .then(res => {
              updateStore(prevState => ({ ...prevState, checkout: res }))
            }),
        updateLineItem: async (lineItemID: string, quantity: string) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) },
          ]

          return store.client.checkout
            .updateLineItems(store.checkout.id, lineItemsToUpdate)
            .then(res => {
              updateStore(prevState => ({ ...prevState, checkout: res }))
            })
        },
        openCart: () =>
          updateStore(prevState => ({ ...prevState, cartOpen: true })),

        closeCart: () =>
          updateStore(prevState => ({ ...prevState, cartOpen: false })),
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
export default StoreContext
