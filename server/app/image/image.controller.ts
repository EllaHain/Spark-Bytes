import { Request, Response } from 'express';
// import prisma from '../prisma_client.ts';

export const createImage = async (req: Request, res: Response) => {
    const base64String = req.body.base64String
    res.send({status:200, req: base64String})
    return
}