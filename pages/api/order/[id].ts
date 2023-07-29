import auth, { isOwner } from "@/utils/auth";
import Order from "@/models/order";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user.id;
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const order = await Order.findOne({
          _id: id,
        })
          .populate("items.item", "name price")
          .exec();
        const isOwnerCheck = await isOwner(order.menu?.toString(), user);
        if (!isOwnerCheck) {
          return res.status(401).json({
            success: false,
            message: "You are not allowed to get orders from this menu",
          });
        }
        return res.status(201).json({
          order,
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          error,
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }
    case "PUT":
      try {
        const { status } = req.body;
        const index = ["قيد الانتظار", "ملغي", "مكتمل"].indexOf(status);
        const variant = ["pending", "cancelled", "completed"][index];
        const order = await Order.findOneAndUpdate(
          {
            _id: id,
          },
          {
            status,
            variant,
          }
        );
        if (order) {
          res.status(201).json({
            order,
            success: true,
            message: "Order updated successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Order not found",
          });
        }
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
