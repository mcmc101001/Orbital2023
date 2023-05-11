import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteS3ObjectLib } from "@/lib/aws_s3_sdk";

export default async function deleteS3Object(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    let { id } = req.body;

    const response = await deleteS3ObjectLib(id);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
