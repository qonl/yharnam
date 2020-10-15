import React from 'react';
import { useGetPosts, useGetProducts } from '../actions';
import { PRISMIC_CONFIG } from '../config/prismic';
import { getAdditionalDocuments, getByType } from '../lib/api';
import { prismicPageData } from '../util/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import withLayout from '@components/layout/Layout';
import Products from '@components/modules/Products';
import Posts from '@components/modules/Posts';

const Home = ({ products: initialProductsData, posts: initialPostsData, page }) => {
    const { data: products } = useGetProducts(initialProductsData);
    const { data: posts } = useGetPosts(initialPostsData);
    const data = prismicPageData(page);

    return (
        <div className="home">
            <div className="home__page-title">
                <RichText render={ data.title } />
            </div>
            <Products data={ products } />
            <Posts data={ posts } />
        </div>
    );
}

export const getStaticProps = async () => {
    try {
        const { HOMEPAGE, PRODUCT, POST } = PRISMIC_CONFIG.DOC_TYPES;
        const page = await getByType(HOMEPAGE);
        const docs = await Promise.all([
            getAdditionalDocuments(page[0]?.data?.products, PRODUCT),
            getAdditionalDocuments(page[0]?.data?.posts, POST),
        ]);

        return {
            props: {
                page,
                products: docs[0], // Is there a better way?
                posts: docs[1],
            },
        }
    } catch(error) {
        throw new Error(error);
    }
}

export default withLayout(Home);
