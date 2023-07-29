import auth, { isOwner } from "@/utils/auth";
import Category from "@/models/category";
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
      message: "You are not allowed to get orders from this menu",
    });
  }
  switch (req.method) {
    case "DELETE":
      try {
        const category = await Category.findOneAndDelete({
          _id: id,
          menu,
        });
        if (category) {
          await Item.deleteMany({
            category: id,
          });
        }
        res.status(201).json({
          category,
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }
      break;
    case "PUT":
      try {
        const { name } = req.body;
        const category = await Category.findOneAndUpdate(
          {
            _id: id,
          },
          {
            name,
          }
        );
        if (category) {
          res.status(201).json({
            category,
            success: true,
            message: "Category updated successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }
      break;
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

export default auth(handler);
