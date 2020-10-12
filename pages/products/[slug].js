import React from 'react';
import { getBySlug, getRepeatableDocuments } from '../../lib/api';
import { PRISMIC_CONFIG } from '../../config/prismic';


const Product = ({ params }) => {
    return (
        <div className="product">
            <h1>This is a product template - { params.slug }</h1>
        </div>
    );
}

export async function getStaticProps({ params, preview = null, previewData = {} }) {
    const { ref } = previewData;
    const { slug } = params;

    const product = await getBySlug(slug);

    return {
        props: {
            params,
            preview,
            product,
        }
    }
}

export async function getStaticPaths() {
    const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
    const products = await getRepeatableDocuments(doc => doc.type === PRODUCT);
    return {
        paths: products.map(doc => `/products/${ doc.uid }`),
        fallback: false,
    }
}

export default Product;