import { Router } from "express";
import express, { Request, Response } from 'express'

const playerRouter = Router()
playerRouter.get('/:playerId', async (req: Request, res: Response) => {
    const playerId = req.params.playerId
    console.log("playerId", playerId)
    const response = await fetch(`https://www.sofascore.com/api/v1/player/${playerId}`,)
    const data = await response.json()
    res.status(200).json(data)
})
export default playerRouter