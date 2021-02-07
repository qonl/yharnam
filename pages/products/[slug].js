import React, { useState, useEffect, useRef } from 'react';
import { getPageData, getRepeatableDocuments } from '@lib/api';
import { PRISMIC_CONFIG } from '@config/prismic';
import { encode, decode } from 'shopify-gid';
import withLayout from '@components/layout/Layout';
import { useAddItemToCart } from '@context/StoreContext';
import { client } from '@context/StoreContext';
import ProductContent from '../../components/modules/Products/Product/Product';

const Product = ({ pageData: { page: product }, preview }) => {
    return (
        <>
            { preview && <div>You're previewing</div> }
            <ProductContent product={ product } />
        </>
    );
}

export async function getStaticProps({ params, preview = false, previewData = {} }) {
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const { ref } = previewData;
        const { slug } = params;
        const pageData = await getPageData(ref, PRODUCT, slug);
        return {
            props: {
                pageData,
                preview,
            },
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every second
            revalidate: 1,
        }
    } catch(error) {
        throw new Error(error);
    }
}

export async function getStaticPaths() {
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const products = await getRepeatableDocuments(doc => doc.type === PRODUCT);
        return {
            paths: products?.map(p => ({ params: { slug: p.uid }})),
            fallback: false,
        }
    } catch(error) {
        throw new Error(error);
    }
}

export default withLayout(Product);