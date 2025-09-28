import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes";
import { PORT } from "./env";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route to test server
app.get("/", (req, res) => {
  res.json({message: "Flex Backend API is running"})
})

app.use("/api/reviews", reviewRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;