import { client } from './client';
import { PRISMIC_CONFIG } from '../config/prismic';
import Prismic from 'prismic-javascript';

async function getAllDocuments() {
    try {
        const response = await client().query('');
        return response.results.map(p => p.data);
    } catch(error) {
        throw new Error(error);
    }
}

export const getByType = async type => {
    try {
        const response = await client().query(
            Prismic.Predicates.at('document.type', type)
        );
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

export const getById = async id => {
    try {
        const response = await client().query(
            Prismic.Predicates.at('document.id', id)
        );
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

export const getByIds = async ids => {
    try {
        const response = await client().query(
            Prismic.Predicates.in('document.id', ids)
        );
        return response?.results || response;
    } catch(error) {

    }
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
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const response = await client().query(
            Prismic.Predicates.at('document.type', PRODUCT)
        );

        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

export const getRepeatableDocuments = async filter => {
    try {
        const allRoutes = await getAllDocuments();
        return allRoutes.filter(filter);
    } catch(error) {
        throw new Error(error);
    }
}