import Item from "@/models/item";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const item = await Item.findOne({ _id: id })
        .populate("menu", "name logo")
        .populate("category", "name")
        .exec();
      res.status(200).json({
        success: true,
        item,
      });
      break;
    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
      break;
  }
};

export default handler;
