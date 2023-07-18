import User from "@/models/user";
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
      res.status(401).json({});
    }
  };

export default auth;
