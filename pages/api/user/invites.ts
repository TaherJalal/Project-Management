import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

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

  if (!userId) {
    res.status(401).send("UnAuthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  //   const { accept } = req.body;

  const invites = await prisma.invitesToSpace.findMany({
    where: {
      userInvited: user?.email,
    },
  });

  const inviters = await Promise.all(
    invites.map(
      async invite =>
        await prisma.user.findUnique({
          where: {
            id: invite.userInvited,
          },
        })
    )
  );

  const space = await Promise.all(
    invites.map(
      async invite =>
        await prisma.space.findUnique({
          where: {
            id: invite.spaceId,
          },
        })
    )
  );

  //   const x = invites.map(
  //     async invite =>
  //       await Promise.all(
  //         await prisma.user.findUnique({
  //           where: {
  //             id: invite.userInvited,
  //           },
  //         })
  //       )
  //   );

  res.json({
    inviters,
    space,
  });
}
