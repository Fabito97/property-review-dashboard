import { Request, Response } from "express";
import {
  fetchAllReviews,
  fetchPropertyReviews,
  getProperty,
} from "../services/hostawayService";
import {
  generateMockProperties,
  generateMockProperty,
} from "../mocks/mockDataGenerator";

export default async function getHostAwayProperties(req: Request, res: Response) {
  try {
    // generate 3–5 properties with reviews
    const properties = generateMockProperties(5);

    return res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, error: message });
  }
};


export const getHostAwayProperty = async (req: Request, res: Response) => {
  console.log("Get a single property");
  const { id: propertyId } = req.params;

  try {
    if (!propertyId) {
      return res
        .status(500)
        .json({ error: "No propertyId provided", succes: false });
    }

    const properties = await getProperty(String(propertyId));
    return res.json({ success: true, data: properties });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: message });
  }
};
