import express, { Request, Response } from 'express'
import userRouter from './routes/user.route'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const PORT = process.env.EXPRESS_PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routers

app.use("/api/users", userRouter)



// <--- Hello World

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




app.listen(PORT, () => {
  console.log(`Server Online At ${PORT} port!`);
})
