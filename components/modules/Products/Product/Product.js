import React, { useEffect, useRef, useState } from 'react';
import styles from './Product.module.scss';
import { client, useAddItemToCart } from '@context/StoreContext';
import { decode, encode } from 'shopify-gid';

const Product = ({ product }) => {
    const {
        title,
        image,
        body_html: html,
    } = product.data.item;

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
        <div className={ styles['product'] }>
            <img src={ image.src } alt={ image.alt } />
            <h1> { title }</h1>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            <form onSubmit={ e => handleSubmit(e) } ref={ form }>
                <button className="product__add-to-cart" type="submit">
                    <span>{ adding ? 'Adding' : 'Add to Cart' }</span>
                </button>
            </form>
        </div>
    );
};

export default Product;