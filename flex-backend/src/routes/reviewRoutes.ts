import { Router } from "express";
import getHostawayReviews from "../controllers/reviewControllers";

const router = Router();

router.get("/hostaway", getHostawayReviews);

export default router;
