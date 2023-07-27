import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/order";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  try {
    const { name, totalPrice, menu, items } = req.body;

    await Order.create({
      name,
      totalPrice,
      menu,
      items,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error - Or menu not found",
    });
  }
};

export default handler;
