import { Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync.helper";
import { User } from "../models/user.model";
import { resSuccess } from "../helpers/response.helper";
import { hash } from "../helpers/hash.helper";
import { createUser, getOneUser } from "../services/user.service";
import { registerInput } from "../validation/register";
import randomColor from "randomcolor";

/**
 * @description Register new user
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as registerInput;
  const user: User | null = await getOneUser({ email });

  if (user) throw new Error("Email already registered");

  const initials = name.replace(/\s/g, "").substring(0, 2).toUpperCase();
  const avatar = `https://ui-avatars.com/api/?name=${initials}&background=${randomColor(
    {
      luminosity: "light",
    }
  ).replace("#", "")}&color=000000`;
  const hashPassword = await hash(password);
  const data = { name, email, password: hashPassword, avatar };
  const newUser: User = await createUser(data);
  const getNewUserWithoutPassword: User | null = await getOneUser({
    email: newUser.email,
  });

  const message = "Register success";
  return resSuccess(res, 201, message, { user: getNewUserWithoutPassword });
});

export default { register };
