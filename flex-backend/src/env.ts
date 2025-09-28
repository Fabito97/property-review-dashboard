import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  ACCOUNT_ID,
  API_KEY, 
  CLIENT_URL, 
  PORT
} = process.env;
