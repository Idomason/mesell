import { IUserData } from "./Types";

export const addition = function (a: number, b: number): number {
  return a + b;
};

export const authenticate = function (
  email: string,
  password: string
): IUserData {
  const authStatus = email === "admin@GMail.com" && password === "ADmin";
  return {
    emailToLowerCase: email.toLowerCase(),
    passwordToLowerCase: password.toLowerCase(),
    emailChar: email.split(""),
    userDetails: { name: "ada", age: 30 },
    isAuthenticated: authStatus,
  };
};
