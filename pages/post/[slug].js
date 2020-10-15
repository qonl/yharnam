import React from 'react';
import { getBySlug, getRepeatableDocuments } from '../../lib/api';
import { PRISMIC_CONFIG } from '../../config/prismic';
import withLayout from '@components/layout/Layout';

const Post = ({ post, preview }) => (
    <>
        { preview && <div>You're previewing</div> }
        <div className="post">
            <h1>This is a post template - { post?.uid }</h1>
        </div>
    </>
);

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
            }
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