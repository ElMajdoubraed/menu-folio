import User from "@/models/user";
import Menu from "@/models/menu";
import dbConnect from "./dbConnect";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

interface DecodedInterface {
  id: string;
  iat: number;
  exp: number;
}

async function check(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const decoded: DecodedInterface = jwt.verify(
    req.cookies?.accessToken as string,
    process.env.JWT_SECRET as string
  ) as DecodedInterface;
  if (decoded?.id) {
    const user = await User.findById(decoded.id);
    if (user) return user;
  }
  throw new Error();
}

const auth =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
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

export const isOwner = async (
  menuId: string | string[] | undefined,
  userId: string
) => {
  try {
    await dbConnect();
    const menu = await Menu.findById(menuId);
    if (menu?.owner?.toString() === userId) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export default auth;
