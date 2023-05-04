import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import jwt from "jsonwebtoken"

export default async function deleteTask(req: NextApiRequest , res: NextApiResponse){
    if(req.method !== "DELETE"){
        res.status(405).send("Method Not Allowed, Not A DELETE Request")
    }

    const token: string = req.headers["authorization"] as string
    const secret: string = process.env.SECRET as string

    const userId: string = jwt.verify(token , secret) as string

    if(!userId){
        res.status(401).send("UnAuthorized")
    }

    const {id} = req.body

    if(!id){
        res.status(400).send("Task Id Is Required")
    }

    await prisma.task.delete({
        where:{
            id
        }
    })

    res.status(200).send("Task Deleted")

}