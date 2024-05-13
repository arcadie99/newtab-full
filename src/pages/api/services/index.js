// pages/api/services/index.js
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const services = await prisma.service.findMany();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch services' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
