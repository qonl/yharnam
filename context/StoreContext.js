// Original file https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js
// Additional functionality https://github.com/ctrl-alt-del-world/midway/blob/master/web/src/context/siteContext.tsx
import React, { useContext, useEffect, useState } from 'react';
import { client } from '@config/shopify';
import cookie from 'js-cookie';

const IS_BROWSER = typeof window !== 'undefined';

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

let initialStoreState = {
    client,
    adding: false,
    checkout: {
        lineItems: [],
    },
    cartOpen: false,
    navOpen: false,
    customerEmail: undefined,
    customerName: undefined,
    customerToken: undefined,
    orders: [],
};

const StoreContext = React.createContext({
    store: initialStoreState,
    setStore: () => null,
});

const setCheckoutInState = (checkout, setStore) => {
    IS_BROWSER ? localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id) : null;
    setStore(prevState => ({ ...prevState, checkout }));
}

const createNewCheckout = store =>  store.client.checkout.create();

const fetchCheckout = (store, id) => store.client.checkout.fetch(id);

// TODO: implement customers
const initCustomer = setStore => {
    const customerEmail = cookie.get('customer_email');
    const customerToken = cookie.get('customer_token');
    const customerName = cookie.get('customer_firstName');

    if (customerEmail && customerToken && customerName) {
        setStore(prevState => ({
            ...prevState,
            customerEmail,
            customerToken,
            customerName
        }));
    }
};

const StoreContextProvider = ({ children }) => {
    const [store, setStore] = useState(initialStoreState);
    const [initStore, setInitStore] = useState(false);

    useEffect(() => {
        if (initStore === false) {
            const initializeCheckout = async () => {
                // Check for an existing cart.
                const existingCheckoutId = IS_BROWSER ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY) : null;

                if (existingCheckoutId) {
                    try {
                        const checkout = await fetchCheckout(store, existingCheckoutId);

                        // Make sure none of the items in this cart have been deleted from Shopify.
                        if (checkout.lineItems.some(lineItem => !lineItem.variant)) {
                            throw new Error(
                                'Invalid line item in checkout. This variant was probably deleted from Shopify',
                            )
                        }

                        // Make sure this cart hasn’t already been purchased.
                        if (!checkout.completedAt) {
                            setCheckoutInState(checkout, setStore);
                            return
                        }
                    } catch(e) {
                        localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null);
                    }
                }

                const newCheckout = await createNewCheckout(store);
                setCheckoutInState(newCheckout, setStore);
            }

            initCustomer(setStore);
            initializeCheckout();
            setInitStore(true);
        }
    }, [store, setStore, store.client.checkout, initStore]);

    return (
        <StoreContext.Provider
            value={{
                store,
                setStore
            }}
        >
            { children }
        </StoreContext.Provider>
    );
}

function useStore() {
    const { store } = useContext(StoreContext);
    return store;
}

const setCustomerInState = () => {
    const { setStore } = useContext(StoreContext)

    async function updateCustomerInState() {
        const customerEmail = cookie.get('customer_email');
        const customerToken = cookie.get('customer_token');
        const customerName = cookie.get('customer_firstName');

        setStore(prevState => ({ ...prevState, customerEmail, customerToken, customerName }));
    }

    return updateCustomerInState;
};

function useCartCount() {
    const {
        store: {
            checkout
        }
    } = useContext(StoreContext);
    let count = 0;
    if (checkout.lineItems) {
        count = checkout.lineItems.reduce((runningTotal, item) => {
            return item.quantity + runningTotal;
        }, 0);
    }

    return count;
}

function useCustomer() {
    const {
        store: {
            customerEmail,
            customerName,
            customerToken
        },
    } = useContext(StoreContext)

    return {
        customerEmail,
        customerName,
        customerToken
    };
}

function useCartTotals() {
    const { store: { checkout } } = useContext(StoreContext);
    const tax = checkout.totalTaxV2
        ? `$${ Number(checkout.totalTaxV2.amount).toFixed(2) }`
        : '-';

    const total = checkout.totalPriceV2
        ? `$${ Number(checkout.totalPriceV2.amount).toFixed(2) }`
        : '-';

    return { tax, total };
}

function useCartItems() {
    const { store: { checkout } } = useContext(StoreContext);
    return checkout.lineItems;
}

function useAddItemToCart() {
    const {
        store: {
            checkout,
            client,
        },
        setStore
    } = useContext(StoreContext);

    async function addItemToCart(variantId, quantity, attributes) {
        if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.');
            return;
        }

        setStore(prevState => ({ ...prevState, adding: true }));

        const checkoutId = checkout.id;
        const lineItemsToAdd = [{
            variantId,
            quantity,
            customAttributes: attributes,
        }];

        const newCheckout = await client.checkout.addLineItems(
            checkoutId,
            lineItemsToAdd
        );

        setStore(prevState => ({
            ...prevState,
            checkout: newCheckout,
            adding: false,
            cartOpen: true,
        }));
    }

    return addItemToCart;
}

function useRemoveItemFromCart() {
    const {
        store: {
            client,
            checkout
        },
        setStore,
    } = useContext(StoreContext)

    async function  removeItemFromCart(itemId) {
        const newCheckout = await client.checkout.removeLineItems(checkout.id, [itemId]);
        setStore(prevState => ({ ...prevState, checkout: newCheckout }));
    }

    return removeItemFromCart;
}

function useUpdateItemsFromCart() {
    const {
        store: {
            checkout,
            client,
        },
        setStore,
    } = useContext(StoreContext);

    async function updateItemsFromCart(items) {
        items = [].concat(items)
        const newCheckout = await client.checkout.updateLineItems(checkout.id, items);
        setStore(prevState => ({ ...prevState, checkout: newCheckout }));
    }

    return updateItemsFromCart
}

function useCheckout() {
    const {
        store: {
            checkout,
        },
    } = useContext(StoreContext)

    return () => window.open(checkout.webUrl);
}

function useToggleCart() {
    const {
        store: {
            cartOpen,
        },
        setStore
    } = useContext(StoreContext);

    async function toggleCart() {
        setStore(prevState => ({ ...prevState, cartOpen: !cartOpen }));
    }

    return toggleCart;
}

export {
    StoreContextProvider,
    setCustomerInState,
    useAddItemToCart,
    useStore,
    useCustomer,
    useCartCount,
    useCartItems,
    useCartTotals,
    useRemoveItemFromCart,
    useUpdateItemsFromCart,
    useCheckout,
    useToggleCart,
    client,
}