import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: {
    id: string;
    name: string;
    email: string;
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id, name, email } = req.user;
  res.status(200).json({
    data: {
      id,
      name,
      email,
    },
  });
};

export default auth(handler);
