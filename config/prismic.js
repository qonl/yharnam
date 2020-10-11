export const PRISMIC_CONFIG = {
    REPO: process.env.NEXT_PUBLIC_PRISMIC_REPO,
    API_URL: `https://${ process.env.NEXT_PUBLIC_PRISMIC_REPO }.cdn.prismic.io/api/v2`,
    DOC_TYPES: {
        HOMEPAGE: 'homepage',
        PAGE: 'page',
        PRODUCT: 'product',
        HEADER: 'header',
        FOOTER: 'footer',
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