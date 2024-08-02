import { Request, Response } from "express";
import { pool } from "../config/db";
import userQuery from "../queries/user.queries";

// Read

export async function GetAllUsers(req: Request, res: Response) {
  try {
    const users = await pool.query(userQuery.GetAllUsers)

    res.status(200).json({
      message: "Success!",
      data: users.rows
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}

export async function GetUserByID(req: Request, res: Response) {
  try {
    const { id } = req.params

    const user = await pool.query(userQuery.GetUserByID, [id])

    // If User Doesn't Exist
    if (!user.rows[0]) {
      return res.status(404).json({
        error: "User Not Found!",
      })
    }

    res.status(200).json({
      message: "Success!",
      data: user.rows[0]
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}

// Update

export async function UpdatePhoneNumberByID(req: Request, res: Response) {
  try {

    const { newPhoneNumber } = req.body



  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}

// Delete

export async function DeleteUserByID(req: Request, res: Response) {
  try {

    const { id } = req.params

    const findByID = await pool.query(userQuery.GetUserByID, [id])

    if (!findByID.rows[0]) {
      return res.status(404).json({ message: "User Doesn't Exists!" })
    }

    const deletedUser = await pool.query(userQuery.DeleteUserByID, [id])

    res.status(202).json({ message: "User Deleted Successfully!" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
}
