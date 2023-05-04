import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function userDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed, Not A GET Request");
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
    include: {
      invitesToSpace: true,
      space: true,
      task: true,
    },
  });

  const invites = user?.invitesToSpace.map(invite => ({
    spaceIds: invite.spaceId,
    from: invite.createdByUser,
  }));

  res.json({
    firstName: user?.firstName,
    lastName: user?.lastName,
    invitesToSpaces: invites,
  });
}
