import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import index from "@/pages";

export default async function addSpace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed, Not A POST Request");
  }

  const token: string = req.headers["authorization"] as string;
  const secret: string = process.env.SECRET as string;

  const userId: string = jwt.verify(token, secret) as string;

  // const { accept } = req.body;

  if (!userId) {
    res.status(401).send("UnAuthorized");
  }

  const userr = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const invites = await prisma.invitesToSpace.findMany({
    where: {
      userInvited: userr?.email,
    },
  });

  const user = await Promise.all(
    invites.map(
      async user =>
        await prisma.user.findUnique({
          where: {
            id: user.createdByUser,
          },
        })
    )
  );

  invites.forEach((x, index) => (x.createdByUser = user[index]?.email!));

  res.json({
    invites,
  });
}
