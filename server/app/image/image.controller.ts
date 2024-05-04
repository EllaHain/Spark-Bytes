import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';

// export const createImage = async (req: Request, res: Response) => {
//     const base64String = req.body.base64String
//     res.send({status:200, req: base64String})
//     return
// }

export const submitImages = async(req: Request, res: Response) => {
    try {
        const postStrs = req.body.postStrs

        const newPosts: any = [];
        
            for (let i = 0; i < postStrs.length; i++) {
                const newPost = await prisma.photo.create({
                    data: {
                        photo: postStrs[i],
                        event_id: 1 
                    }
                });
                newPosts.push(newPost);
            }

        res.send({status: 200, newPosts: newPosts})
        return;
    } catch (error) {
        res.send({status: 400, error: error})
        return
    }
    
}   