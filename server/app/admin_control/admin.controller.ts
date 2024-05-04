import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';

export const edit_users = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      isAdmin: true,
    },
  });
  if (!isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
};
