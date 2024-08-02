import { Response } from 'express';
import jwt from 'jsonwebtoken'

export async function genToken(userID: number, res: Response) {
  try {
    const token = jwt.sign({ userID }, process.env.SECRET_KEY as string, { expiresIn: '1d' })

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })

  } catch (error) {
    res.status(418).json({ error: "Error In Token Generation!" })
  }
}
