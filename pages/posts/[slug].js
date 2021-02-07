import React from 'react';
import { getBySlug, getRepeatableDocuments } from '@lib/api';
import { PRISMIC_CONFIG } from '@config/prismic';
import withLayout from '@components/layout/Layout';
import PostContent from '@components/modules/Posts/Post/Post';

const Post = ({ post, preview }) => {
    return (
        <PostContent post={ post } preview={ preview } />
    );
}

export async function getStaticProps({ params, preview = false, previewData = {} }) {
    try {
        const { POST } = PRISMIC_CONFIG.DOC_TYPES;
        const { ref } = previewData;
        const { slug } = params;
        const post = await getBySlug(POST, slug, ref);
        return {
            props: {
                post,
                preview,
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

export async function getStaticPaths() {
    try {
        const { POST } = PRISMIC_CONFIG.DOC_TYPES;
        const posts = await getRepeatableDocuments(doc => doc.type === POST);
        return {
            paths: posts?.map(p => ({ params: { slug: p.uid }})),
            fallback: false,
        }
    } catch(error) {
        throw new Error(error);
    }
}

export default withLayout(Post);