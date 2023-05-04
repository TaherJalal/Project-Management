import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

export default async function updateSpace(req: NextApiRequest , res : NextApiResponse){
    if(req.method !== "PUT"){
        res.status(405).send("Method Not Allowed, Not A PUT Request")
    }

    const token: string = req.headers["authorization"] as string
    const secret: string = process.env.SECRET as string

    const userId: string = jwt.verify(token , secret) as string

    if(!userId){
        res.status(401).send("UnAuthorized")
    }

    const {spaceId , name} = req.body
    const errors = []

    if(!spaceId){
        errors.push("Space Id Is Missing?!")
    }

    if(!name){
        errors.push("Space Name Is Required To Update")
    }

    if(errors.length > 0){
        res.status(400).json(errors)
    }

    await prisma.space.update({
        where:{
            id : spaceId
        },
        data:{
            name
        }
    })

    res.status(200).send("Space Named Updated")

}