import jwt from "jsonwebtoken";
import type { Response } from "express";


export const signToken = (_id: string, res: Response) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    // ✅ Use 'lax' for localhost. 'none' requires secure:true which fails on HTTP.
    sameSite: 'lax', 
    maxAge: 24 * 60 * 60 * 1000,
    path: '/' 
  });
};   
