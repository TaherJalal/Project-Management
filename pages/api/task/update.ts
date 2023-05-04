import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function updateTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).send("Method Not Allowed, Not A PUT Request");
  }

  const token: string = req.headers["authorization"] as string;
  const secret: string = process.env.SECRET as string;

  const userId: string = jwt.verify(token, secret) as string;

  if (!userId) {
    res.status(401).send("UnAuthorized");
  }

  const { id, title, description, priority, status } = req.body;

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      priority,
      status,
    },
  });

  res.status(201).send("Task Updated");
}
