import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "@/helpers/sendEmail";
import jwt from "jsonwebtoken";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await dbConnect();
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        const data = { id: user._id };
        const expiresIn = "5m";
        const result = jwt.sign(
          data,
          (user.password + process.env.JWT_SECRET) as string,
          {
            expiresIn,
          }
        );
        const messageTemplate = `يبدو أنك نسيت كلمة المرور الخاصة بحسوب .
         إذا كان هذا صحيحًا ، فانقر فوق الارتباط أدناه لإعادة تعيين كلمة المرور الخاصة بك.`;
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/${user.id}/${result}`;
        const message = sendEmail(
          email,
          link,
          "رابط إعادة تعيين كلمة المرور",
          messageTemplate
        );
        res.status(200).json(message);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    await dbConnect();
    const { id, token, password } = req.body;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        const payload: any = jwt.verify(
          token,
          user.password + process.env.JWT_SECRET
        );
        if (payload.id !== user.id) {
          res.status(400).json({});
          return;
        }
        user.password = password;
        await user.save();
        res.status(200).json({});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  } else if (req.method === "GET") {
    const { token, id } = req.query;
    try {
      const user = await User.findOne({ _id: id });
      const payload: any = jwt.verify(
        token as string,
        (user.password + process.env.JWT_SECRET) as string
      );
      if (!payload || !payload.id) {
        res.status(400).json({
          message: "رابط إعادة تعيين كلمة المرور غير صالح",
          error: 1,
        });
        return;
      }
      res.status(200).json({});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({});
    return;
  }
};

export default handler;
