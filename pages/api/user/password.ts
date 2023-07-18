import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400).json({});

  const { password, newPassword } = req.body;

  if (req.user.comparePassword(password)) {
    req.user.password = newPassword;
    await req.user.save();
    return res.status(200).json({});
  }
  res.status(400).json({});
};

export default auth(handler);
