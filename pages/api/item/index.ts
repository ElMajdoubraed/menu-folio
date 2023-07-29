import type { NextApiRequest, NextApiResponse } from "next";
import Item from "@/models/item";
import auth, { isOwner } from "@/utils/auth";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  await dbConnect();
  try {
    const user = req.user.id;
    const { name, price, description, image, category, menu } = req.body;
    const isOwnerCheck = await isOwner(menu, user);

    if (!isOwnerCheck) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed create item in this menu",
      });
    }

    await Item.create({
      name,
      price,
      description,
      image,
      category,
      menu,
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error - Or menu not found",
    });
  }
};

export default auth(handler);
