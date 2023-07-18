import mongoose from "mongoose";
import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest {
    user: any;
    params: any;
  }
  interface NextApiResponse {
    user: any;
    status: (code: number) => NextApiResponse;
    send: (body: any) => NextApiResponse;
    json: (body: any) => NextApiResponse;
    cookie: (name: string, value: string, options?: any) => NextApiResponse;
    setHeader: (name: string, value: string) => NextApiResponse;
  }
}

declare global {
  var mongoose: any;
}
