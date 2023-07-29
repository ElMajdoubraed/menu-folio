import auth from "@/utils/auth";
import Menu from "@/models/menu";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user.id;
  switch (req.method) {
    case "GET":
      const menus = await Menu.find({ owner: user }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        menus,
      });
      break;
    case "POST":
      if (!user)
        return res.status(401).json({
          success: false,
          message: "You are not allowed to create a menu",
        });

      const { name, description, address, phone, logo } = req.body;

      await Menu.create({
        name,
        description,
        address,
        phone,
        owner: user,
        logo,
      });

      res.status(201).json({
        success: true,
        message: "Menu created successfully",
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
