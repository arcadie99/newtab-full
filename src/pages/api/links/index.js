// pages/api/links/index.js
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const links = await prisma.link.findMany();
            res.status(200).json(links);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch links' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
