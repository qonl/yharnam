export const PRISMIC_CONFIG = {
    REPO: process.env.NEXT_PUBLIC_PRISMIC_REPO,
    API_URL: `https://${ process.env.NEXT_PUBLIC_PRISMIC_REPO }.cdn.prismic.io/api/v2`,
    DOC_TYPES: {
        HOMEPAGE: 'homepage',
        PAGE: 'page',
        PRODUCT: 'product',
        HEADER: 'header',
        FOOTER: 'footer',
        POST: 'post',
    },
}

export const linkResolver = doc => {
    const { HOMEPAGE, PAGE, PRODUCT, POST } = PRISMIC_CONFIG.DOC_TYPES;
    switch(true) {
        case doc.type === PAGE:
            return `/${ doc.uid }`;
        case doc.type === PRODUCT:
            return `/products/${ doc.uid }`;
        case doc.type === POST:
            return `/posts/${ doc.uid }`;
        // Add case for each page
        default:
            // Default to homepage
            return '/';
    }
}

// Additional helper function for Next/Link component
export const hrefResolver = doc => {
    const { HOMEPAGE, PAGE, PRODUCT, POST } = PRISMIC_CONFIG.DOC_TYPES;
    switch(true) {
        case doc.type === PAGE:
            return `/[uid]`;
        case doc.type === PRODUCT:
            return `/products/[slug]`;
        case doc.type === POST:
            return `/posts/[slug]`;
        default:
            // Default to homepage
            return '/';
    }
}