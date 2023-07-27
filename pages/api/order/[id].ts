import auth, { isOwner } from "@/utils/auth";
import Order from "@/models/order";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.user.id;
  const { menu } = req.query;
  const isOwnerCheck = await isOwner(menu, user);
  if (!isOwnerCheck) {
    return res.status(401).json({
      success: false,
      message: "You are not allowed to get orders from this menu",
    });
  }
  switch (req.method) {
    case "GET":
      try {
        const order = await Order.findOne({
          _id: menu,
        });

        res.status(201).json({
          order,
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error - Or menu not found",
        });
      }
    case "PUT":
      try {
        const { status } = req.body;
        const index = ["قيد الانتظار", "ملغي", "مكتمل"].indexOf(status);
        const variant = ["pending", "completed", "cancelled"][index];
        const order = await Order.findOneAndUpdate(
          {
            _id: menu,
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

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
};

export default auth(handler);
