import { getByType } from '@lib/api';
import { PRISMIC_CONFIG } from '@config/prismic';

export default async function getHeaderData(req, res) {
    const { LAYOUT } = PRISMIC_CONFIG.DOC_TYPES;

    try {
        const data = await getByType(LAYOUT);

        console.log(data);

        // res.status(200).json(header);
    } catch(error) {
        throw new Error(error);
    }
}