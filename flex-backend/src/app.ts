import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import { CLIENT_URL, PORT } from "./env";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

// console.log("Client_Url", CLIENT_URL)


// Root route to test server
app.get("/", (req, res) => {
  res.json({message: "Flex Backend API is running"})
})

app.use("/api/reviews", reviewRoutes)
app.use("/api/properties", propertyRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;