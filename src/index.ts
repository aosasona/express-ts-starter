import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./config/db";

//PARSE ENV VARIABLES
dotenv.config();

//CONNECT TO MONGODB
connect();

const app: Express = express();

//APP MIDDLE-WARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//APP ROUTES - IMPORT
import dummyRoutes from "./routes/dummyRoutes";

app.use("/", dummyRoutes);

//DEFAULT RESPONSE TO TEST API
app.use("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, world!");
});

const PORT: string | number = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
