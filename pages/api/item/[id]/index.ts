import auth, { isOwner } from "@/utils/auth";
import Item from "@/models/item";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user.id;
  const { id, menu } = req.query;
  const isOwnerCheck = await isOwner(menu, user);
  if (!isOwnerCheck) {
    return res.status(401).json({
      success: false,
      message: "You are not allowed to handle this menu",
    });
  }
  switch (req.method) {
    case "PUT":
      const { name, price, description, image } = req.body;
      await Item.findOneAndUpdate(
        {
          menu,
          _id: id,
        },
        {
          name,
          price,
          description,
          image,
        }
      );

      res.status(201).json({
        success: true,
        message: "Item updated successfully",
      });
      break;
    case "DELETE":
      await Item.deleteOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
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

export default auth(handler);
