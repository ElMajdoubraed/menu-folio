import auth, { isOwner } from "@/utils/auth";
import Order from "@/models/order";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });

    const user = req.user.id;
    const { id } = req.query;
    const isOwnerCheck = await isOwner(id, user);
    if (!isOwnerCheck) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to get orders from this menu",
      });
    }

    const orders = await Order.find({
      menu: id,
      variant: "pending",
    });

    res.status(201).json({
      orders,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error - Or menu not found",
    });
  }
};

export default auth(handler);
