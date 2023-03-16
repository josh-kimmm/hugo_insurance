import express, { json } from "express";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import UserController from "./controllers/user";
import ApplicationController from "./controllers/application";


const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(sessions({
  secret: "super_secret_key",
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 8640000000      // expire after 1 day
  }
}));
app.use(cookieParser());
app.use(json());


app.post('/user/new', UserController.newUser);


app.get('/application/resume', ApplicationController.resume);
app.put('/application/update', ApplicationController.update);
app.post('/application/submit', ApplicationController.submit);
