"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsers = GetAllUsers;
const db_1 = require("../config/db");
const user_queries_1 = require("../queries/user.queries");
async function GetAllUsers(req, res) {
    try {
        const users = await db_1.pool.query(user_queries_1.GetAllUsersQ);
        res.status(200).json({
            message: "Success!",
            data: users.rows
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
}
