import { Router } from "express";

const router = Router();

router.get("/hostaway", () => {
  console.log("hostaway properties");
});

export default router;