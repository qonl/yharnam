import { getAllProducts } from '../../lib/api';

export default async function getProducts(req, res) {
    const data = await getAllProducts();
    res.status(200).json(data);
}