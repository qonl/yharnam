import React from 'react';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '../../config/prismic';

const Products = ({ data }) => {
    return (
        <div className="products">
            <h2>Products</h2>
            { data.map(item => {
                const { data } = item;
                return (
                    <div key={ data.item.id } className="product">
                        <Link href={ hrefResolver(item) } as={ linkResolver(item) }>
                            <a>
                                <h1>{ data.item.title }</h1>
                            </a>
                        </Link>
                        <img src={ data.item.image.src } alt={ data.item.image.alt } />
                        <div dangerouslySetInnerHTML={{ __html: data.item.body_html }}></div>
                    </div>
                );
            })}
        </div>
    )
}

export default Products;