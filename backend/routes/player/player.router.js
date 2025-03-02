"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playerRouter = (0, express_1.Router)();
playerRouter.get('/:playerId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = req.params.playerId;
    console.log("playerId", playerId);
    const response = yield fetch(`https://www.sofascore.com/api/v1/player/${playerId}`);
    const data = yield response.json();
    res.status(200).json(data);
}));
exports.default = playerRouter;
