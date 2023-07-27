import User from "@/models/user";
import Menu from "@/models/menu";
import dbConnect from "./dbConnect";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

async function check(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const decoded: any = jwt.verify(
    req.cookies?.accessToken as string,
    process.env.JWT_SECRET as string
  );
  if (decoded?.id) {
    const user = await User.findById(decoded.id);
    if (user) return user;
  }
  throw new Error();
}

const auth =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.user = await check(req, res);
      return handler(req, res);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "أنت غير مصرح لك بالدخول لهذه الصفحة !",
      });
    }
  };

export const isOwner = async (menuId: any, userId: any) => {
  try {
    await dbConnect();
    const menu = await Menu.findById(menuId);
    if (menu?.owner === userId) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export default auth;
