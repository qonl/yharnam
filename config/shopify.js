import Client from 'shopify-buy';

export const SHOPIFY_CONFIG = {
    ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    STORE_NAME: process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME,
}

export const client = Client.buildClient({
    storefrontAccessToken: SHOPIFY_CONFIG.ACCESS_TOKEN,
    domain: `${ SHOPIFY_CONFIG.STORE_NAME }.myshopify.com`,
});