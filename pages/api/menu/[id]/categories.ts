import Category from "@/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const categories = await Category.find({
          menu: id,
        });

        res.status(201).json({
          categories,
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
