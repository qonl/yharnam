import Prismic from 'prismic-javascript';
import { PRISMIC_CONFIG } from '../config/prismic';

export const API_URL = `https://${ PRISMIC_CONFIG.REPO }.cdn.prismic.io/api/v2`;
export const API_TOKEN = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN;

export const client = Prismic.client(API_URL, { accessToken: API_TOKEN });