// Original File https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js
import React, { useContext, useEffect, useState } from 'react';
import Client from 'shopify-buy';
import { SHOPIFY_CONFIG } from '@config/shopify';

const StoreContext = React.createContext();

const IS_BROWSER = typeof window !== 'undefined';

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

export const client = Client.buildClient({
    storefrontAccessToken: SHOPIFY_CONFIG.ACCESS_TOKEN,
    domain: `${ SHOPIFY_CONFIG.STORE_NAME }.myshopify.com`,
});

const setCheckoutInState = (checkout, setStore) => {
    IS_BROWSER ? localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id) : null;
    setStore(prevState => ({ ...prevState, checkout }))
}

const createNewCheckout = store =>  store.client.checkout.create();

const fetchCheckout = (store, id) => store.client.checkout.fetch(id);

const StoreContextProvider = ({ children }) => {
    let initialStoreState = {
        client,
        adding: false,
        checkout: { lineItems: [] },
        products: [],
        shop: {},
        cartOpen: false,
    }

    const [store, setStore] = useState(initialStoreState);

    useEffect(() => {
        const initializeCheckout = async () => {
            // Check for an existing cart.
            const isBrowser = typeof window !== 'undefined';
            const existingCheckoutId = isBrowser
                ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
                : null;

            if (existingCheckoutId) {
                try {
                    const checkout = await fetchCheckout(existingCheckoutId)
                    // Make sure this cart hasn’t already been purchased.
                    if (!checkout.completedAt) {
                        setCheckoutInState(checkout)
                        return
                    }
                } catch(e) {
                    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null)
                }
            }

            const newCheckout = await createNewCheckout(store);
            setCheckoutInState(newCheckout, setStore);
        }

        initializeCheckout();
    }, [store.client.checkout])

    return (
        <StoreContext.Provider value={{ store, setStore }}>
            { children }
        </StoreContext.Provider>
    )
}

function useStore() {
    const { store } = useContext(StoreContext);
    return store;
}

function useCartCount() {
    const { store: { checkout } } = useContext(StoreContext);
    return checkout.lineItems.reduce((runningTotal, item) => item.quantity + runningTotal, 0);
}

function useCartTotals() {
    const { store: { checkout } } = useContext(StoreContext);
    const tax = checkout.totalTaxV2
        ? `$${ Number(checkout.totalTaxV2.amount).toFixed(2) }`
        : "-";

    const total = checkout.totalPriceV2
        ? `$${ Number(checkout.totalPriceV2.amount).toFixed(2) }`
        : "-";

    return { tax, total };
}

function useCartItems() {
    const { store: { checkout } } = useContext(StoreContext);
    return checkout.lineItems;
}

function useAddItemToCart() {
    const { store, setStore } = useContext(StoreContext);

    const addItemToCart = async (variantId, quantity) => {
        if (variantId === "" || !quantity) {
            console.error("Both a size and quantity are required.");
            return;
        }

        setStore(prevState => ({ ...prevState, adding: true }));

        const { checkout, client } = store;

        const checkoutId = checkout.id;
        const lineItemsToUpdate = [{ variantId, quantity: parseInt(quantity, 10) }];

        const newCheckout = await client.checkout.addLineItems(
            checkoutId,
            lineItemsToUpdate
        );

        setStore(prevState => ({
            ...prevState,
            checkout: newCheckout,
            adding: false,
            cartIsOpen: true,
        }));
    }

    return addItemToCart;
}

function useRemoveItemFromCart() {
    const {
        store: { client, checkout },
        setStore,
    } = useContext(StoreContext)

    const removeItemFromCart = async itemId => {
        const newCheckout = await client.checkout.removeLineItems(checkout.id, [itemId]);
        setStore(prevState => ({ ...prevState, checkout: newCheckout }));
    }

    return removeItemFromCart;
}

function useCheckout() {
    const {
        store: { checkout },
    } = useContext(StoreContext)

    return () => {
        window.open(checkout.webUrl)
    }
}

function useToggleCart() {
    const {
        store: { cartOpen },
        setStore
    } = useContext(StoreContext);

    return async () => setStore(prevState => ({...prevState, cartOpen: !cartOpen}));
}

export {
    StoreContextProvider,
    useAddItemToCart,
    useStore,
    useCartCount,
    useCartItems,
    useCartTotals,
    useRemoveItemFromCart,
    useCheckout,
    useToggleCart,
}