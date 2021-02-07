import React from 'react';
import { useGetPosts, useGetProducts } from '../actions';
import { PRISMIC_CONFIG } from '@config/prismic';
import { getAdditionalDocuments, getPageData } from '@lib/api';
import { prismicPageData } from '@util/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import withLayout from '@components/layout/Layout';
import Products from '@components/modules/Products/Products';
import Posts from '@components/modules/Posts/Posts';

const Home = ({ products: initialProductsData, posts: initialPostsData, pageData }) => {
    const { data: products } = useGetProducts(initialProductsData);
    const { data: posts } = useGetPosts(initialPostsData);
    const data = prismicPageData(pageData.page);

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

export const getStaticProps = async ({ previewData = {} }) => {
    try {
        const { ref } = previewData;
        const { HOMEPAGE, PRODUCT, POST } = PRISMIC_CONFIG.DOC_TYPES;
        const pageData = await getPageData(ref, HOMEPAGE);
        const docs = await Promise.all([
            getAdditionalDocuments(pageData?.page[0]?.data?.products, PRODUCT),
            getAdditionalDocuments(pageData?.page[0]?.data?.posts, POST),
        ]);

        return {
            props: {
                pageData,
                products: docs[0], // Is there a better way?
                posts: docs[1],
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

export default withLayout(Home);
