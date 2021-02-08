import React from 'react';
import { PRISMIC_CONFIG } from '@config/prismic';
import { getPageData } from '@lib/api';
import { prismicPageData } from '@util/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import withLayout from '@components/layout/Layout';
import { Module } from '@components/modules';

const Home = ({ pageData }) => {
    const data = prismicPageData(pageData.page);

    return (
        <div className="home">
            <div className="home__page-title">
                <RichText render={ data.title } />
            </div>
            { data.body.map((module, key) => <Module key={ key } module={ module } />) }
        </div>
    );
}

export const getStaticProps = async ({ previewData = {} }) => {
    try {
        const { ref } = previewData;
        const { HOMEPAGE } = PRISMIC_CONFIG.DOC_TYPES;
        const pageData = await getPageData(ref, HOMEPAGE);

        return {
            props: {
                pageData,
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
