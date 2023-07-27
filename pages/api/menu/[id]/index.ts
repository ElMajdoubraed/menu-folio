import auth from "@/utils/auth";
import Menu from "@/models/menu";
import Category from "@/models/category";
import Item from "@/models/item";
import Order from "@/models/order";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.user.id;
  const { id } = req.params;
  switch (req.method) {
    case "GET":
      const menu = await Menu.findOne({ owner: user, _id: id });
      res.status(200).json({
        success: true,
        menu,
      });
    case "PUT":
      const { name, description, address, phone, logo } = req.body;
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
          owner: user,
          logo,
        }
      );

      res.status(201).json({
        success: true,
        message: "Menu updated successfully",
      });

    case "DELETE":
      await Menu.deleteOne({ owner: user, _id: id });
      await Category.deleteMany({ menu: id });
      await Item.deleteMany({ menu: id });
      await Order.deleteMany({ menu: id });
      res.status(200).json({
        success: true,
        message: "Menu deleted successfully",
      });

    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
};

export default auth(handler);
