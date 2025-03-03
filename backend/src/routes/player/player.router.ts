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

playerRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).json(
        { "player": { "name": "Ashley Cole", "slug": "ashley-cole", "shortName": "A. Cole", "team": { "name": "England XI", "slug": "england-xi", "shortName": "England XI", "gender": "M", "sport": { "name": "Football", "slug": "football", "id": 1 }, "primaryUniqueTournament": { "name": "Club Friendly Games", "slug": "club-friendly-games", "primaryColorHex": "#25497d", "secondaryColorHex": "#d38f1d", "category": { "id": 1468, "country": {}, "name": "World", "slug": "world", "sport": { "name": "Football", "slug": "football", "id": 1 }, "flag": "international" }, "userCount": 32656, "id": 853, "country": {}, "displayInverseHomeAwayTeams": false }, "userCount": 2082, "nameCode": "EXI", "disabled": false, "national": false, "type": 0, "id": 479851, "country": { "alpha2": "EN", "alpha3": "ENG", "name": "England", "slug": "england" }, "entityType": "team", "teamColors": { "primary": "#374df5", "secondary": "#374df5", "text": "#ffffff" }, "fieldTranslations": { "nameTranslation": { "ar": "إنجلترا الحادي عشر", "hi": "इंग्लैंड XI", "bn": "ইংল্যান্ড XI" }, "shortNameTranslation": { "ar": "انجلترا الحادي عشر", "hi": "इंग्लैंड XI", "bn": "ইংল্যান্ড XI" } } }, "position": "D", "jerseyNumber": "3", "height": 176, "preferredFoot": "Left", "retired": false, "userCount": 238, "deceased": false, "id": 2, "country": { "alpha2": "EN", "alpha3": "ENG", "name": "England", "slug": "england" }, "shirtNumber": 3, "dateOfBirthTimestamp": 346118400, "fieldTranslations": { "nameTranslation": { "ar": "اشلي كول", "hi": "एश्ले कोल", "bn": "অ্যাশলে কোল" }, "shortNameTranslation": { "ar": "ا. كول", "hi": "ए. कोल", "bn": "এ. কোল" } } } }
    )
})
export default playerRouter