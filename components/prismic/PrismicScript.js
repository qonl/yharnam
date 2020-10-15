import React from 'react';
import { PRISMIC_CONFIG } from '../../config/prismic';

const API_URL = PRISMIC_CONFIG.API_URL;

/**
 * Generate the prismic script required for previews
 * @returns {JSX.Element}
 * @constructor
 */
const PrismicScript = () => {
    const [, repoName] = API_URL.match(/https?:\/\/([^.]+)?\.(cdn\.)?.+/);

    return <script async defer src={ `//static.cdn.prismic.io/prismic.js?repo=${ repoName }&new=true` } />;
}

export default PrismicScript