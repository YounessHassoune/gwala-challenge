import { Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync.helper";
import { User } from "../models/user.model";
import { resSuccess } from "../helpers/response.helper";
import { compare, hash } from "../helpers/hash.helper";
import {
  createUser,
  getOneUser,
  updateOneUserById,
} from "../services/user.service";
import { registerInput } from "../validation/register";
import randomColor from "randomcolor";
import { loginInput } from "../validation/login";
import {
  generateAccessToken,
  generateRefreshToken,
  generateSessionToken,
} from "../helpers/jwt.helper";
import { createSession } from "../services/session.service";

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

/**
 * @description Login user
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body as loginInput;

  const user: User | null = await getOneUser({ email }, {}, false);

  if (!user) throw new Error("User not found");

  console.log({
    password,
    user,
  });

  const isPasswordMatch = await compare(password, user.password);

  if (!isPasswordMatch) throw new Error("Password is incorrect");

  const JWTPayload = { id: user._id, email: user.email };
  const accessToken = generateAccessToken(JWTPayload, "15m");
  const refreshToken = generateRefreshToken(JWTPayload, "5d");

  const date = new Date();
  const sessionObj = {
    refreshToken,
    userId: user._id,
    expiresAt: date.setDate(date.getDate() + 5),
  };
  const newSession = await createSession(sessionObj);

  await updateOneUserById(user._id, {
    $push: { sessions: newSession },
  });

  const encryptSessionId = generateSessionToken(
    { sessionId: newSession._id.toString() },
    "5d"
  );

  res.cookie("session", encryptSessionId, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  const message = "Login success";
  return resSuccess(res, 200, message, { accessToken, refreshToken });
});

export default { register, login };
