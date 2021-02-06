import React, { useState, useEffect, useRef } from 'react';
import { getPageData, getRepeatableDocuments } from '@lib/api';
import { PRISMIC_CONFIG } from '@config/prismic';
import { encode, decode } from 'shopify-gid';
import withLayout from '@components/layout/Layout';
import { useAddItemToCart } from '@context/StoreContext';
import { client } from '@context/StoreContext';

const Product = ({ pageData: { page: product }, preview }) => {
    const addItemToCart = useAddItemToCart();
    const form = useRef();
    const [check, setCheck] = useState(true);
    const [activeVariantId, setActiveVariantId] = useState('');
    const [available, setAvailable] = useState(false);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (check) {
            const shopifyId = encode('Product', product.data.item.id, {
                accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
            });

            client.product.fetch(shopifyId).then(product => {
                const decodedVariants = [];
                product.variants.forEach(variant => {
                    decodedVariants.push({
                        ...variant,
                        cleanId: parseInt(decode(variant.id).id, 0),
                    });
                });
                setActiveVariantId(decodedVariants[0].id);
                setAvailable(decodedVariants[0].available);

                setCheck(false);
            })
        }
    }, [check]);

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setAdding(true);
        if (available) {
            addItemToCart(activeVariantId, 1).then(() => {
                setAdding(false)
            })
        }
    }

    return (
        <>
            { preview && <div>You're previewing</div> }
            <div className="product">
                <h1>This is a product template - { product?.uid }</h1>
                <form onSubmit={ e => handleSubmit(e) } ref={ form }>
                    <button className="product__add-to-cart" type="submit">
                        <span>{ adding ? 'Adding' : 'Add to Cart' }</span>
                    </button>
                </form>
            </div>
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