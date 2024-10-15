import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
