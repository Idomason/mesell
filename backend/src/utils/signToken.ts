import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const signToken = (id: JwtPayload) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
