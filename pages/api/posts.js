import { getAllPosts } from '@lib/api';

export default async function getPosts(req, res) {
    try {
        const data = await getAllPosts();
        res.status(200).json(data);
    } catch(error) {
        throw new Error(error);
    }
}