import { Request, Response } from 'express';
// import prisma from '../prisma_client.ts';

export const createImage = async (req: Request, res: Response) => {
    const request = req.body
    res.send({status:200, req: request})
    return
}