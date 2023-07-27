import auth, { isOwner } from "@/utils/auth";
import Category from "@/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });

  const user = req.user.id;
  const { name, description, menu } = req.body;
  const isOwnerCheck = await isOwner(menu, user);
  if (!isOwnerCheck) {
    return res.status(401).json({
      success: false,
      message: "You are not allowed to add a category to this menu",
    });
  }

  await Category.create({
    name,
    description,
    menu,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
  });
};

export default auth(handler);
