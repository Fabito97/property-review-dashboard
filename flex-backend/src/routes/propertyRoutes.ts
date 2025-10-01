import { Router } from "express";
import getHostAwayPropertyReviews, { getHostAwayProperty } from "../controllers/propertyControllers";

const router = Router();

router.get("/hostaway", getHostAwayPropertyReviews);
router.get("/:id/hostaway", getHostAwayProperty);

export default router;
