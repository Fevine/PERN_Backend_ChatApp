import { Router } from "express";
import { DeleteUserByID, GetAllUsers, GetUserByID, UpdatePhoneNumberByID } from "../controllers/user.controller";
import { Login, Register } from "../controllers/auth.controller";
import { checkCookie } from "../middlewares/checkCookie";

const router = Router()

// Auth

router.post("/register", Register)
router.post("/login", Login)

// Get

router.get("/getall", GetAllUsers)
router.get("/getuser/:id", checkCookie, GetUserByID)

// Update

router.put("/updatephonenumber/:id", UpdatePhoneNumberByID)

// Delete

router.delete("/deleteuser/:id", DeleteUserByID)

export default router
