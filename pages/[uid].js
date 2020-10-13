import React from 'react'
import { getRepeatableDocuments } from '../lib/api';
import { PRISMIC_CONFIG } from '../config/prismic';
import { getBySlug } from '../lib/api';

const Page = () => <h1>This is a page template</h1>;


export async function getStaticProps({ params, preview = null, previewData = {} }) {
    try {
        const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;
        const { ref } = previewData;
        const { slug } = params;
        const document = await getBySlug(PAGE, slug, ref);
        return {
            props: {
                params,
                preview,
                document,
            }
        }
    } catch(error) {
        throw new Error(error);
    }
}

export async function getStaticPaths() {
    const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;
    const documents = await getRepeatableDocuments(doc => doc.type === PAGE);
    return {
        paths: documents?.map(doc => ({ params: { slug: doc.uid }})),
        fallback: false,
    }
}

export default Page;