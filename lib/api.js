import { client } from './client';
import { PRISMIC_CONFIG } from '../config/prismic';
import Prismic from 'prismic-javascript';

async function getAllDocuments() {
    const response = await client.query('');
    return response.results.map(p => p.data);
}

export const getByType = async type => {
    const response = await client.query(
        Prismic.Predicates.at('document.type', type)
    );

    return response?.results || response
}

export const getById = async id => {
    const response = await client.query(
        Prismic.Predicates.at('document.id', id)
    );

    return response?.results || response
}

export const getByIds = async ids => {
    const response = await client.query(
        Prismic.Predicates.in('document.id', ids)
    );

    return response?.results || response;
}

export const getBySlug = async (slug, preview) => {
    const response = await client.query(
        Prismic.Predicates.at('document.id', slug)
    );

    return response?.results || response;
}

export const getAllProducts = async () => {
    const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
    const response = await client.query(
        Prismic.Predicates.at('document.type', PRODUCT)
    );

    return response?.results || response;
}

export const getRepeatableDocuments = async filter => {
    const allRoutes = await getAllDocuments();
    return allRoutes.filter(filter);
}