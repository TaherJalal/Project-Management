import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function createTask(
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

  const { spaceId, user, title, description, status, priority } = req.body;
  const errors = [];

  if (!spaceId) {
    errors.push("Missing Space Id");
  }

  if (!user) {
    errors.push("Missing User Id");
  }

  if (!title) {
    errors.push("Missing Title");
  }

  if (!description) {
    errors.push("Missing Description");
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
  }

  await prisma.task.create({
    data: {
      spaceId,
      createdByUser: user,
      title,
      description,
      status,
      priority,
    },
  });

  res.status(201).send("Task Created");
}
