export const PRISMIC_CONFIG = {
    REPO: '',
    API_URL: '',
    DOC_TYPES: {
        // Add doc types...
    },
}

export const linkResolver = doc => {
    const { HOMEPAGE, PAGE, PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;

    switch(doc.type) {
        case doc.type === PAGE:
            return `/${ doc.uid }`;
        case doc.type === PRODUCT:
            return `/products/${ doc.uid }`;
        // Add case for each page
        default:
            return '/';
    }
}

// Additional helper function for Next/Link component
export const hrefResolver = doc => {
    const { HOMEPAGE, PAGE, PRODUCT } = PRISMIC_CONFIG.DOC_TYPES;

    switch(doc.type) {
        case doc.type === PAGE:
            return `/[uid]`;
        case doc.type === PRODUCT:
            return `/products/[slug]`;
        default:
            return '/';
    }
}