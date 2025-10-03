import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";

import Routes from "./routes/routes.js";
import { swaggerUi, specs } from "./swagger.js";

connectDB("mongodb://localhost:27017/","movie_explorer_L7");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/movie", Routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
