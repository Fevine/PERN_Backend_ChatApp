import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { pool } from "../config/db";
import userQuery from "../queries/user.queries";
import { genToken } from "../utils/genToken";
import { LoginDto, RegisterDto } from '../Types/auth.dto';


export async function Register(req: Request<{}, {}, RegisterDto>, res: Response) {
  try {
    const { username, email, password, confirmPassword, phoneNumber } = req.body

    // Find username If Exists
    const findByUsername = await pool.query(userQuery.GetUserByUsername, [username])

    if (findByUsername.rows[0]) {
      return res.status(406).json({ error: `${username} Named User Already Exists!` })
    }

    // Check Passwords
    if (password !== confirmPassword) {
      return res.status(406).json({ error: "Passwords Don't Match!" })
    }

    // Check email
    const findByEmail = await pool.query(userQuery.GetUserByEmail, [email])

    if (findByEmail.rows[0]) {
      return res.status(406).json({ error: `This Email is Already Used!` })
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10)


    // Create User
    const newUser = await pool.query(userQuery.CreateUser, [username, email, hashedPassword, phoneNumber])

    genToken(newUser.rows[0].user_id, res)

    res.status(201).json({
      message: `${username} Created Successfully!`,
      data: newUser.rows[0]
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}


export async function Login(req: Request<{}, {}, LoginDto>, res: Response) {
  try {
    const { username, password } = req.body

    // Find username If Exists
    const user = await pool.query(userQuery.GetPassword, [username])

    if (!user.rows[0]) {
      return res.status(404).json({ error: `${username} Named User Doesn't Exists!` })
    }

    // Check Passwords
    const CheckPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!CheckPassword) {
      return res.status(406).json({ error: "Username and Password Don't Match!" })
    }

    // Generate Token and Place It in res.cookie
    genToken(user.rows[0].user_id, res)

    res.status(201).json({
      message: `Welcome back, ${username}!`
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}
