import React from 'react';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '@config/prismic';

const Products = ({ data }) => {
    return (
        <div className="products">
            <h2>Products</h2>
            { data.map(p => {
                const { data: { item } } = p;

                return (
                    <div key={ item.id } className="product">
                        <Link href={ hrefResolver(p) } as={ linkResolver(p) }>
                            <a className="product__link">
                                <h1>{ item.title }</h1>
                            </a>
                        </Link>
                        <img className="product__image" src={ item.image.src } alt={ item.image.alt } />
                        <div className="product__price">{ `${ item.variants[0].price } blood echoes` }</div>
                        <div className="product__desc" dangerouslySetInnerHTML={{ __html: item.body_html }}></div>
                    </div>
                );
            })}
        </div>
    )
}

export default Products;