import React from 'react'
import { getPageData, getRepeatableDocuments } from '../lib/api';
import { PRISMIC_CONFIG } from '../config/prismic';
import withLayout from '@components/layout/Layout';

const Page = ({ params: { slug } }) => <h1>This is a page template - { slug }</h1>;

export async function getStaticProps({ params, preview = null, previewData = {} }) {
    try {
        const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;
        const { ref } = previewData;
        const { slug } = params;
        const pageData = await getPageData(ref, PAGE, slug);
        return {
            props: {
                params,
                preview,
                pageData,
            }
        }
    } catch(error) {
        throw new Error(error);
    }
}

export async function getStaticPaths() {
    try {
        const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;
        const documents = await getRepeatableDocuments(doc => doc.type === PAGE);
        return {
            paths: documents?.map(doc => ({ params: { slug: doc.uid }})),
            fallback: false,
        }
    } catch(error) {
        throw new Error(error);
    }
}

export default withLayout(Page);