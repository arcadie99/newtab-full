// pages/api/links/add.js
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, link } = req.body;
    try {
      const newLink = await prisma.link.create({
        data: { name, link }
      });
      res.status(200).json(newLink);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create link' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
