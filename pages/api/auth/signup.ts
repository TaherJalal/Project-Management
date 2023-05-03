import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed, Not A POST Request");
  }

  const { firstName, lastName, email, password } = req.body
  const salt = process.env.SALT
  const secret: string= process.env.SECRET as string

  const checkEmail = await prisma.user.findUnique({
    where:{
        email
    }
  })

  if(checkEmail){
    res.status(400).send("Email ALready Used")
  }

  const errors = []

  if(!firstName){
    errors.push("First Name Is required")
  }

  if(firstName.length >  20 && firstName.length < 3){
    errors.push("First Name Characters Should Be Graeter Than 3 And Less Than 20")
  }

  if(!lastName){
    errors.push("Last Name Is Required")
  }

  if(lastName.length >  20 && lastName.length < 3){
    errors.push("First Name Characters Should Be Graeter Than 3 And Less Than 20")
  }

  if(!email){
    errors.push("Email Is Required")
  }

  if(!email.includes("@") || !email.includes(".com")){
    errors.push("Not A Valid Email Address")
  }

  if(!password){
    errors.push("Password Is Required")
  }

  if(password.length < 8 || password.length > 22){
    errors.push("Password Must Be Between 8 To 22 Characters Long")
  }

//   if(!password.includes("@") || !password.includes(".") || !password.includes("!")){
//     errors.push("Password Must Contain Special Characters")
//   }

  if(errors.length > 0){
    res.status(400).send(errors)
  }

  const encPassword = bcrypt.hashSync(password , 10)

  const user = await prisma.user.create({
    data :{
        firstName,
        lastName,
        email,
        password: encPassword
    }
  })

  const token = jwt.sign(user.id , secret)

  res.status(200).json(token)

}
