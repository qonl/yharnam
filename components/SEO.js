import React, { useEffect, useState } from 'react';
import { linkResolver } from '../config/prismic';
import Head from 'next/head';
import { PRISMIC_CONFIG } from '../config/prismic';
import {prismicPageData} from '../util/prismicHelpers';

/**
 * Renders SEO metadata
 * @param {array} data
 * @returns {JSX.Element}
 * @constructor
 */
const SEO = ({ data }) => {
    const isPost = data[0].type === PRISMIC_CONFIG.POST;
    const [hostname, setHostname] = useState();
    const document = prismicPageData(data);
    useEffect(() => setHostname(window.location.href), []);

    return (
        <Head>
            { document.meta_title && <title>{ document.meta_title }</title> }
            { document.meta_description && <meta name="description" content={ document.meta_description } /> }
            <meta property="og:url" content={`${ hostname }${ linkResolver(document) }` } />
            { isPost && <meta property="og:type" content="article" /> }
            { document.social_title && <meta property="og:title" content={ document.social_title } /> }
            { document.social_description && <meta property="og:description" content={ document.social_description } /> }
            { document.social_image && document.social_image.url && <meta property="og:image" content={ document.social_image.url } /> }
            { document.social_image && document.social_image_height && <meta property="og:image:height" content={ parseInt(document.social_image_height, 10) } /> }
            { document.social_image && document.social_image_width && <meta property="og:image:width" content={ parseInt(document.social_image_width, 10) } /> }
            { document.social_image && document.social_image_type && <meta property="og:image:type" content={ document.social_image_type } /> }
            { document.social_image && document.social_image.alt && <meta property="og:image:alt" content={ document.social_image.alt } /> }
            <meta name="twitter:card" content="summary_large_image" />
            { document.social_title && <meta name="twitter:title" content={ document.social_title } /> }
            { document.social_description && <meta name="twitter:description" content={ document.social_description } /> }
            { document.social_image && document.social_image.url && <meta name="twitter:image" content={ document.social_image.url } /> }
            { document.social_image && document.social_image.alt && <meta name="twitter:image:alt" content={ document.social_image.alt } /> }
        </Head>
    )
}

export default SEO;