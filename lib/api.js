import { client } from './client';
import { PRISMIC_CONFIG } from '../config/prismic';
import Prismic from 'prismic-javascript';

async function getAllDocuments() {
    const response = await client().query('')
        .catch(() => console.error('Fetch all documents failed'));
    return response?.results || response;
}

export const getByType = async type => {
    const response = await client().query(
        Prismic.Predicates.at('document.type', type)
    ).catch(() => console.error('Fetch by type failed'));
    return response?.results || response;
}

export const getById = async id => {
    const response = await client().query(
        Prismic.Predicates.at('document.id', id)
    ).catch(() => console.error('Fetch by ID failed'));
    return response?.results || response;
}

export const getByIds = async ids => {
    const response = await client().query(
        Prismic.Predicates.in('document.id', ids)
    ).catch(() => console.error('Fetch by multiple IDs failed'));
    return response?.results || response;
}

// TODO: integrate Prismic preview
export const getBySlug = async (type, slug, ref) => {
    try {
        const response = await client().getByUID(type, slug, ref ? { ref } : null) || {};
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

export const getProductBySlug = async (slug, ref) => {
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const response = await client().getByUID(PRODUCT, slug, ref ? { ref } : null) || {};
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

export const getAllProducts = async () => {
    const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
    const response = await client().query(
        Prismic.Predicates.at('document.type', PRODUCT)
    ).catch(() => console.error('Fetch all products failed'));
    return response?.results || response;
}

export const getRepeatableDocuments = async filter => {
    const allRoutes = await getAllDocuments()
        .catch(() => console.error('Fetch of repeatable documents failed'));
    return allRoutes.filter(filter);
}