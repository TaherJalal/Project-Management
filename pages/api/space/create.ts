import { NextApiRequest , NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

export default async function addSpace(req: NextApiRequest , res: NextApiResponse) {

    if(req.method !== "POST"){
        res.status(405).send("Method Not Allowed, Not A POST Request")
    }

    const token: string = req.headers["authorization"] as string
    const secret: string = process.env.SECRET as string

    if(!token){
        res.status(401).send("UnAuthorized")
    }

    const userId: string = jwt.verify(token , secret) as string

    await prisma.space.create({
        data:{
            createdByUser : userId,
            users : userId
        }
    })

    res.json("Space Added")

}