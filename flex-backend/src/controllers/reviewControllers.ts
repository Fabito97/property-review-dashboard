import { Request, Response } from "express";
import { mockReviews } from "../mockDB";

const getHostawayReviews = (req: Request, res: Response) => {
  res.json({
    message: "Hostaway reviews retrieved successfully",
    success: true,
    data: mockReviews,
  });
};

export default getHostawayReviews;
