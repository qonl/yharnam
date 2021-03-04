import React from 'react';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '@config/prismic';
import styles from './Products.module.scss';
import { useGetProducts } from '@actions/index';

const Products = ({ data: productsData }) => {
    const { data } = useGetProducts(productsData);

    return (
        <div className={ styles['products'] }>
            <h2>Products</h2>
            <div className={ styles['products__wrapper'] }>
                { data.items.map(p => {
                    const {
                        product: {
                            data: {
                                item
                            }
                        }
                    } = p;

                    return (
                        <div key={ item.id } className={ styles['products__product-card'] }>
                            <Link
                                href={ hrefResolver(p.product) }
                                as={ linkResolver(p.product) }
                            >
                                <a className="product__link">
                                    <h1>{ item.title }</h1>
                                </a>
                            </Link>
                            <img className="product__image" src={ item.image.src } alt={ item.image.alt } />
                            <div className={ styles['products__product-price'] }>{ `${ item.variants[0].price } blood echoes` }</div>
                            <div className="product__desc" dangerouslySetInnerHTML={{ __html: item.body_html }}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Products;