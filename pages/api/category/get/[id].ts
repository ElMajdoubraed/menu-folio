import Item from "@/models/item";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const items = await Item.find({
          category: id,
        });
        res.status(200).json({
          items,
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }
      break;
    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
};

export default handler;
