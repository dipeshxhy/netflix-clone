import express from "express";
import { getTrendingTv,getTvTrailers,getTvDetails ,getSimilarTv,getTvByCategory} from "../controllers/tvControllers.js";

const router=express.Router()

router.get("/trending",getTrendingTv)
router.get("/:id/trailers",getTvTrailers)
router.get("/:id/details",getTvDetails)
router.get("/:id/similar",getSimilarTv)
router.get("/:category",getTvByCategory)



export default router