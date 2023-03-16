import { Request, Response } from "express";
import DAO_User from "../dao/dao_user";
import { User } from "../db/models/user";

const newUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { sessionID, body: userPayload } = req;
  
  const existingUser = await DAO_User.findBySessionId(sessionID);

  if(!existingUser){
    await User.create({
      ...userPayload,
      session_id: sessionID
    });
    return res.json({ message: "Successfully created a new user"});
  }

  res.redirect("/application/resume");
};

export default {
  newUser
}