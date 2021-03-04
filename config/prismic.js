import { RichText } from 'prismic-reactjs';
import Router from 'next/router';

export const PRISMIC_CONFIG = {
    REPO: process.env.NEXT_PUBLIC_PRISMIC_REPO,
    API_URL: `https://${ process.env.NEXT_PUBLIC_PRISMIC_REPO }.cdn.prismic.io/api/v2`,
    DOC_TYPES: {
        HOMEPAGE: 'homepage',
        PAGE: 'page',
        PRODUCT: 'product',
        LAYOUT: 'layout',
        POST: 'post',
    },
    SLICE_TYPES: {
        PRODUCTS: 'products',
        POSTS: 'posts',
    },
    FETCH_LINKS: [
        'product.item',
        'post.image',
        'post.title',
        'post.content',
        'post.date',
    ],
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
};

const Elements = RichText.Elements;
const onClickHandler = function(href, as) {
    return e => {
        e.preventDefault();
        Router.push(href, as);
    }
};

const propsWithUniqueKey = function(props, key) {
    return Object.assign(props || {}, { key });
};

export const serializer = function (type, element, content, children, key) {
    var props = {}
    switch (type) {
        case Elements.hyperlink: // Link
            if (element.data.link_type === 'Document') {
                // Only for internal links add the new onClick that will imperatively route to the appropiate page
                props = Object.assign({
                    onClick: onClickHandler(hrefResolver(element.data), linkResolver(element.data)),
                    href: linkResolver(element.data)
                })
                return React.createElement('a', propsWithUniqueKey(props, key), children)
            } else {
                // Default link handling
                const targetAttr = element.data.target ? {target: element.data.target} : {}
                const relAttr = element.data.target ? {rel: 'noopener'} : {}
                props = Object.assign({
                    href: element.data.url || linkResolver(element.data)
                }, targetAttr, relAttr)
                return React.createElement('a', propsWithUniqueKey(props, key), children)
            }

        case Elements.image: // Image
            var props = {}
            let internal = false

            if (element.linkTo && element.linkTo.link_type === 'Document') {
                // Exclusively for internal links, build the object that can be used for router push
                internal = true
                props = Object.assign({
                    onClick: onClickHandler(hrefResolver(element.linkTo), linkResolver(element.linkTo)),
                    href: linkResolver(element.linkTo)
                })
            }

            // Handle images just like regular HTML Serializer
            const linkUrl = element.linkTo ? element.linkTo.url || linkResolver(element.linkTo) : null
            const linkTarget = (element.linkTo && element.linkTo.target) ? {target: element.linkTo.target} : {}
            const linkRel = linkTarget.target ? {rel: 'noopener'} : {}
            const img = React.createElement('img', {src: element.url, alt: element.alt || ''})
            return React.createElement(
                'p',
                propsWithUniqueKey({className: [element.label || '', 'block-img'].join(' ')}, key),
                linkUrl ? React.createElement('a',
                    // if it's an internal link, replace the onClick
                    internal ? propsWithUniqueKey(props, key) : Object.assign({href: linkUrl},
                        linkTarget, linkRel), img) : img
            )

        default:
            return null
    }
}