import { linkResolver } from '@config/prismic';
import { client } from '@lib/client';

export default async (req, res) => {
    const { token: ref, documentId } = req.query;
    const redirectUrl = await client(req)
        .getPreviewResolver(ref, documentId)
        .resolve(linkResolver, '/');

    if (!redirectUrl) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Sets the preview cookie in your browser
    // __prerender_bypass __next_preview_data
    res.setPreviewData({ ref });
    res.writeHead(302, { Location: `${ redirectUrl }`  })
    res.end();
};