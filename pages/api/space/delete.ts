import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function deleteSpace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed, Not A POST Request");
  }

  const token: string = req.headers["authorization"] as string;
  const secret: string = process.env.SECRET as string;

  const userId: string = jwt.verify(token, secret) as string;

  if (!userId || !req.headers["authorization"]) {
    res.status(401).send("UnAuthorized");
  }

  const { spaceId } = req.body;

  await prisma.space.delete({
    where: {
      id: spaceId,
    },
  });

  await prisma.invitesToSpace.deleteMany({
    where: {
      spaceId,
    },
  });

  res.status(201).send("Space Deleted");
}
