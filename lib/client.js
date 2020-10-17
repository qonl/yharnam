import Prismic from 'prismic-javascript';
import { PRISMIC_CONFIG } from '@config/prismic';

export const API_URL = `https://${ PRISMIC_CONFIG.REPO }.cdn.prismic.io/api/v2`;
export const API_TOKEN = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN;

export const client = (req = null) => Prismic.client(API_URL, createClientOptions(req, API_TOKEN));

const createClientOptions = (req = null, prismicAccessToken = null) => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
    return {
        ...reqOption,
        ...accessTokenOption,
    }
}