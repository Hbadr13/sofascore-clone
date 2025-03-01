import express, { Request, Response } from 'express'
import { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import playerRouter from '@routes/player/player.router';
dotenv.config()
console.log(process.env.REACT_APP_CLOUD_NAME)
console.log(process.env.REACT_APP_API_KEY)
console.log(process.env.REACT_APP_API_SECRET)

const port: string = process.env.PORT || '4000'
const app: Express = express()

app.listen((port), () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
app.use(cors(
    {
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    }
))
app.use(cookieParser());
app.use(express.json())

app.use('/api/v1/player', playerRouter)
