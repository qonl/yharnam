import React from 'react'
import { getRepeatableDocuments } from '../lib/api';
import { client } from '../lib/client';
import { PRISMIC_CONFIG } from '../config/prismic';

const Page = () => {
    return <h1>This is a page template</h1>
}


export async function getStaticProps({ params, preview = null, previewData = {} }) {
    const { ref } = previewData;
    const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;

    const document = await client.getByUID(PAGE, params.uid, ref ? { ref } : null) || {};

    return {
        props: {
            params,
            preview,
            document,
        }
    }
}

export async function getStaticPaths() {
    const { PAGE } = PRISMIC_CONFIG.DOC_TYPES;
    const documents = await getRepeatableDocuments(doc => doc.type === PAGE)
    return {
        paths: documents.map(doc => `/${ doc.uid }`),
        fallback: true,
    }
}

export default Page