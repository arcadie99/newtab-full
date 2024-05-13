// pages/api/services/add.js
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, service } = req.body;
    try {
      const newService = await prisma.service.create({
        data: { name, service }
      });
      res.status(200).json(newService);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create service' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
