import Link from 'next';
import { hrefResolver, linkResolver } from '@config/prismic';
import PrismicDOM from 'prismic-dom';

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type, element, content, children, index) => (
    <Link key={ element.data.id } href={ hrefResolver(element.data) } as={ linkResolver(element.data) }>
        <a>{ content }</a>
    </Link>
);

export const PrismicHTML = content => {
    const HTMLString = PrismicDOM.RichText.asHtml(content, linkResolver)

    // Sometimes Prismic returns empty HTML tags... so check for those
    return HTMLString.replace(/<[^>]*>?/gm, '') === '' ? '' : HTMLString
}

/**
 * This method makes sure that a response for a page type always
 * returns the data, regardless of how it is nested
 *
 * @param pageData
 * @returns {*}
 */
export const prismicPageData = pageData => {
    if (Array.isArray(pageData)) {
        return pageData[0].data
    } else {
        return pageData.data
    }
}

/**
 * Prismic doesn't always name the slice property consistently.
 * This attempts to safely access the right slice body.
 *
 * @param data
 * @returns {*}
 */
export const prismicSliceData = data => data.body1 || data.body;