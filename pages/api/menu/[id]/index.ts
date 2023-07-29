import auth from "@/utils/auth";
import Menu from "@/models/menu";
import Category from "@/models/category";
import Item from "@/models/item";
import Order from "@/models/order";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user.id;
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const menu = await Menu.findOne({ owner: user, _id: id });
      res.status(200).json({
        success: true,
        menu,
      });
      break;
    case "PUT":
      const { name, description, address, phone } = req.body;
      await Menu.findOneAndUpdate(
        {
          owner: user,
          _id: id,
        },
        {
          name,
          description,
          address,
          phone,
        }
      );

      res.status(201).json({
        success: true,
        message: "Menu updated successfully",
      });

      break;
    case "DELETE":
      await Menu.deleteOne({ owner: user, _id: id });
      await Category.deleteMany({ menu: id });
      await Item.deleteMany({ menu: id });
      await Order.deleteMany({ menu: id });
      res.status(200).json({
        success: true,
        message: "Menu deleted successfully",
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
