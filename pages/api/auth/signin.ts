import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.SECRET;

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed, Not A POST Request");
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400).send("Email Not Found");
  }

  const checkPass: boolean = bcrypt.compareSync(password, user?.password!);

  if (!checkPass) {
    res.status(401).send("Wrong Password");
  }

  const token: string = jwt.sign(user?.id!, secret!);

  res.status(200).json({ token: token });
}
