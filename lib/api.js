import { client } from './client';
import { PRISMIC_CONFIG } from '../config/prismic';
import Prismic from 'prismic-javascript';

export const getPageData = async (ref, type, slug) => {
    try {
        const data = await Promise.all([
            slug ? getBySlug(ref, type, slug) : getByType(type),
            getByType(PRISMIC_CONFIG.DOC_TYPES.HEADER),
            getByType(PRISMIC_CONFIG.DOC_TYPES.FOOTER),
        ]);

        return {
            page: data[0],
            header: data[1],
            footer: data[2],
        }
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Query all the documents
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
async function getAllDocuments() {
    const response = await client().query('')
        .catch(() => console.error('Fetch all documents failed'));

    return response?.results || response;
}

/**
 * Query by document type
 * @param {string} type
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
export async function getByType(type) {
    const response = await client().query(
        Prismic.Predicates.at('document.type', type)
    ).catch(() => console.error('Fetch by type failed'));

    return response?.results || response;
}

/**
 * Query by document id
 * @param {string} id
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
export async function getById(id) {
    const response = await client().query(
        Prismic.Predicates.at('document.id', id)
    ).catch(() => console.error('Fetch by ID failed'));

    return response?.results || response;
}

/**
 * Query by multiple document ids
 * @param {array} ids
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
export async function getByIds(ids) {
    const response = await client().query(
        Prismic.Predicates.in('document.id', ids)
    ).catch(() => console.error('Fetch by multiple IDs failed'));

    return response?.results || response;
}

/**
 * Query by a documents uid/slug
 * @param {string} type
 * @param {string} slug
 * @param {object} ref - preview object
 * @returns {Promise<string|Document[]|SpeechRecognitionResultList|Document>}
 */
export async function getBySlug(type, slug, ref) {
    try {
        const response = await client().getByUID(type, slug, ref ? { ref } : null) || {};
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Query a product by its slug
 * @param {string} slug
 * @param {object} ref - preview object
 * @returns {Promise<string|Document[]|SpeechRecognitionResultList|Document>}
 */
export async function getProductBySlug(slug, ref) {
    try {
        const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
        const response = await client().getByUID(PRODUCT, slug, ref ? { ref } : null) || {};
        return response?.results || response;
    } catch(error) {
        throw new Error(error);
    }
}

/**
 * Query all products
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
export async function getAllProducts() {
    const { PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;
    const response = await client().query(
        Prismic.Predicates.at('document.type', PRODUCT)
    ).catch(() => console.error('Fetch all products failed'));

    return response?.results || response;
}

/**
 * Query all posts
 * @returns {Promise<Document[]|ApiSearchResponse>}
 */
export async function getAllPosts() {
    const { POST } = PRISMIC_CONFIG.DOC_TYPES;
    const response = await client().query(
        Prismic.Predicates.at('document.type', POST)
    ).catch(() => console.error('Fetch all posts failed'));

    return response?.results || response;
}

/**
 * Query repeatable documents of a specific filter (this should be a type)
 * @param {function} filter
 * @returns {Promise<T[]>}
 */
export async function getRepeatableDocuments(filter) {
    const allRoutes = await getAllDocuments()
        .catch(() => console.error('Fetch of repeatable documents failed'));

    return allRoutes.filter(filter);
}

/**
 * Query linked documents for their
 * contents, i.e. content relationship fields
 *
 * @param {object} data
 * @param {string} field - the prismic field
 * @returns {Promise<Document[]|Document[]|ApiSearchResponse|void>}
 */
export async function getAdditionalDocuments(data, field) {
    const docIds = [];
    data.forEach(item => docIds.push(item[field].id));
    const response = await getByIds(docIds)
        .catch(() => console.error('Fetch of additional documents failed'));

    return response?.results || response;
}