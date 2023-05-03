import { NextApiRequest , NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

export default async function invite(req: NextApiRequest ,res: NextApiResponse){
    if(req.method !== "POST"){
        res.status(405).send("Method Not Allowed, Not A POST Request")
    }

    const token: string = req.headers["authorization"] as string
    const secret: string = process.env.SECRET as string

    if(!token){
        res.status(401).send("UnAuthorized")
    }

    const {spaceId , userToBeInvited} = req.body

    if(!userToBeInvited){
        res.status(400).send("No User To Be Invited")
    }

    await prisma.invitesToSpace.update({
        where: {
            id : spaceId
        },
        data:{
            userInvited : userToBeInvited
        }
    })

}