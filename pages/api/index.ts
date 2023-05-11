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

  const invites = await prisma.invitesToSpace.findMany({
    where: {
      userInvited: userId,
    },
  });

  res.json(invites);

  // const { firstName, lastName, invitesToSpace, space } =
  //   await prisma.user.findUniqueOrThrow({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       invitesToSpace: true,
  //       space: {
  //         select: {
  //           id: true,
  //           createdByUser: true,
  //           name: true,
  //           task: true,
  //         },
  //       },
  //     },
  //   });

  // const user = await Promise.all(
  //   invitesToSpace.map(
  //     async (user) =>
  //       await prisma.user.findUnique({
  //         where: {
  //           id: user.createdByUser,
  //         },
  //       })
  //   )
  // );

  // invitesToSpace.forEach((x, index) => (x.createdByUser = user[index]?.email!));

  // res.json({
  //   name: firstName + " " + lastName,
  //   invites: invitesToSpace,
  //   spaces: space,
  // });
}
