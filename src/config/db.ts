import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

export const pool = new Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRES_PORT as unknown as number
})

pool.on("connect", ()=>{
  console.log("Connected To Database Succesfully!");
})

pool.on("error", ()=>{
  console.error("Error Connecting To Database!");
})
