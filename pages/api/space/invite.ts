import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function invite(
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

  const { spaceId, userToBeInvited } = req.body;

  const inSpace = await prisma.space.findFirst({
    where: {
      id: spaceId,
      users: {
        has: userToBeInvited,
      },
    },
  });

  const invited = await prisma.invitesToSpace.findFirst({
    where: {
      spaceId,
      userInvited: userToBeInvited,
    },
  });

  if (!userToBeInvited) {
    res.status(400).send("No User To Be Invited");
  }

  if (inSpace || invited) {
    res.status(500).send("User Already In Space Or Invited");
  } else {
    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    await prisma.invitesToSpace.create({
      data: {
        createdByUser: userId,
        spaceName: space?.name!,
        userInvited: userToBeInvited,
        spaceId: spaceId,
      },
    });

    res.status(201).send("Invite Created");
  }
}
