import { getAllProducts } from '../../lib/api';

export default async function getProducts(req, res) {
    try {
        const data = await getAllProducts();
        res.status(200).json(data);
    } catch(error) {
        throw new Error(error);
    }
}