import React from 'react';
import { useGetProducts } from '../actions';
import { hrefResolver, linkResolver, PRISMIC_CONFIG } from '../config/prismic';
import { getByType, getByIds } from '../lib/api';
import { prismicPageData } from '../util/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import withLayout from '@components/layout/Layout';

const Home = ({ products: initialData, page }) => {
    const { data: products, error } = useGetProducts(initialData);
    const data = prismicPageData(page);
    return (
        <div className="home">
            <div className="home__page-title">
                <RichText render={ data.title } />
            </div>
            { products.map(item => {
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
    );
}

export const getStaticProps = async () => {
    const { HOMEPAGE } = PRISMIC_CONFIG.DOC_TYPES;
    const page = await getByType(HOMEPAGE);
    const productsArr = [];
    page[0].data.products.forEach(item => productsArr.push(item.product.id));
    const products = await getByIds(productsArr);
    return {
        props: {
            products,
            page,
        },
    }
}

export default withLayout(Home);
