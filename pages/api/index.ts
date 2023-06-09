import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed, Not A GET Request");
  }

  const token: string = req.headers["authorization"] as string;
  const secret: string = process.env.SECRET as string;

  const userId: string = jwt.verify(token, secret) as string;

  if (!userId) {
    res.status(401).send("UnAuthorized");
  }

  const invitesToSpace = await prisma.invitesToSpace.findMany({
    where: {
      userInvited: userId,
    },
  });

  const { firstName, lastName } = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const space = await prisma.space.findMany({
    where: {
      users: {
        has: userId,
      },
    },
  });

  const user = await Promise.all(
    invitesToSpace.map(
      async user =>
        await prisma.user.findUnique({
          where: {
            id: user.createdByUser,
          },
        })
    )
  );

  invitesToSpace.forEach((x, index) => (x.createdByUser = user[index]?.email!));

  res.json({
    name: firstName + " " + lastName,
    invites: invitesToSpace,
    spaces: space,
    totalSpaces: space.length,
    totalInvites: invitesToSpace.length,
    day: new Date(),
  });
}
