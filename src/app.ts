import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


app.get('/', (req: Request, res: Response) => {
  
  
  res.send('Express + TypeScript Server yayssyss');
});
