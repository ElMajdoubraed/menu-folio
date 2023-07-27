import auth, { isOwner } from "@/utils/auth";
import Category from "@/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.user.id;
  const { menu } = req.query;
  const isOwnerCheck = await isOwner(menu, user);
  if (!isOwnerCheck) {
    return res.status(401).json({
      success: false,
      message: "You are not allowed to get catrgories for this menu",
    });
  }
  switch (req.method) {
    case "GET":
      try {
        const catrgories = await Category.find({
          menu,
        });

        res.status(201).json({
          catrgories,
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
};

export default auth(handler);
