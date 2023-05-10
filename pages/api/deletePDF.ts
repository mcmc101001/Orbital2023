import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ResourceType } from "@/lib/content";

export interface deletePDFType {
  id: string;
  resourceType: ResourceType;
}

export default async function deletePDF(
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
    let { id, resourceType } = req.body as deletePDFType;
    // ensure authenticated user is the owner of the PDF
    if (resourceType === "Cheatsheets") {
      const PDFentry = await prisma.cheatsheet.deleteMany({
        where: {
          id: id,
          userId: session.user.id,
        },
      });
      res.status(200).json({ PDFentry });
    } else if (resourceType === "Past Papers") {
      const PDFentry = await prisma.cheatsheet.deleteMany({
        where: {
          id: id,
          userId: session.user.id,
        },
      });
      res.status(200).json({ PDFentry });
    } else if (resourceType === "Notes") {
      const PDFentry = await prisma.cheatsheet.deleteMany({
        where: {
          id: id,
          userId: session.user.id,
        },
      });
      res.status(200).json({ PDFentry });
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}