import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { pool } from "../config/db";
import userQueries from "../queries/user.queries";
import { decodedTokenType } from "../Types/decodedToken";

export async function checkCookie(req: Request, res: Response, next: NextFunction) {
  try {

    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided!" })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as decodedTokenType

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token!" })
    }

    const user = await pool.query(userQueries.GetUserByID, [decodedToken.userID])

    res.locals.user = user.rows[0]

    next()

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}