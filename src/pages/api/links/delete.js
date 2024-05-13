// pages/api/links/delete.js
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            await prisma.link.delete({
                where: { id }
            });
            res.status(200).json({ message: 'Link deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete link' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
