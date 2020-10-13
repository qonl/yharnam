import React from 'react';
import { getBySlug, getRepeatableDocuments } from '../../lib/api';
import { PRISMIC_CONFIG } from '../../config/prismic';

const Product = ({ product, preview }) => {
    return (
        <>
            { preview && <div>You're previewing</div> }
            <div className="product">
                <h1>This is a product template - { product?.uid }</h1>
            </div>
        </>
    );
}

export async function getStaticProps({ params, preview = false, previewData = {} }) {
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const { ref } = previewData;
        const { slug } = params;
        const product = await getBySlug(PRODUCT, slug, ref);
        return {
            props: {
                product,
                preview,
            }
        }
    } catch(error) {
        throw new Error(error);
    }
}

export async function getStaticPaths() {
    const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
    const products = await getRepeatableDocuments(doc => doc.type === PRODUCT);
    return {
        paths: products?.map(p => ({ params: { slug: p.uid }})),
        fallback: false,
    }
}

export default Product;