import express from "express";
import { getSearchHistory, removeItemFromHistory, searchMovie, searchPerson, searchTv } from "../controllers/searchControllers.js";

const router=express.Router()

router.get("/person/:query",searchPerson)
router.get("/movie/:query",searchMovie)
router.get("/tv/:query",searchTv)

router.get("/history",getSearchHistory)
router.delete("/history/:id",removeItemFromHistory)


export default router