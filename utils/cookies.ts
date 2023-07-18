import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const cookie = (
  res: NextApiResponse,
  name: string,
  value: object,
  options: any = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  options.path = options?.path || "/";

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const cookies = (handler: any) => (req: NextApiRequest, res: any) => {
  res.cookie = (name: string, value: object, options: NextApiResponse) =>
    cookie(res, name, value, options);
  return handler(req, res);
};

export default cookies;
