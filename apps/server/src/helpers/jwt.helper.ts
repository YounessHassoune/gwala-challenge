import jwt, { JwtPayload } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SESSION_TOKEN_SECRET,
} from "../config";

/**
 * @description Generate token
 * @param {object} payload - Payload to be encoded
 * @param {string} tokenSecret - Token secret key
 * @param {string | number} expired - Expired time
 * @returns {string} - Token
 */
export function generateToken(
  payload: object | string = {},
  tokenSecret: string,
  expired: string | number
): string {
  return jwt.sign(payload, tokenSecret as string, { expiresIn: expired });
}

/**
 * @description Verify the token with token secret key to get a decoded token
 * @param {string} token - Token
 * @param {string} tokenSecret - Token secret key
 * @returns {object | string | undefined}
 */
export function verifyToken(
  token: string,
  tokenSecret: string
): object | string | undefined {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    throw new Error("invalid token");
  }
}

/**
 * @description Generate access token
 * @param {object | string} payload
 * @param {string} expired
 * @returns {string}
 */
export function generateAccessToken(
  payload: object | string = {},
  expired: string = "1h"
): string {
  return generateToken(payload, ACCESS_TOKEN_SECRET, expired);
}

/**
 * @description Generate refresh token
 * @param {object | string} payload
 * @param {string} expired
 * @returns {string}
 */
export function generateRefreshToken(
  payload: object | string = {},
  expired: string = "10h"
): string {
  return generateToken(payload, REFRESH_TOKEN_SECRET, expired);
}

/**
 * @description Generate session token
 * @param {object | string} payload
 * @param {string} expired
 * @returns
 */
export function generateSessionToken(
  payload: object | string = {},
  expired: string
): string {
  return generateToken(payload, SESSION_TOKEN_SECRET, expired);
}
