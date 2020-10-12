import React from 'react';
import { getBySlug } from '../../lib/api';


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

export default Product;