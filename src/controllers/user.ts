import { Request, Response } from "express";
import DAO_User from "../dao/dao_user";
import { User } from "../db/models/user";
import { IApplicationResponse } from "../types/routes";

const newUser = async (req: Request<{}, {}, User>, res: Response<IApplicationResponse>) => {
  const { sessionID, body: userPayload } = req;
  
  const existingUser = await DAO_User.findBySessionId(sessionID);

  if(existingUser)
    return res.redirect("/application/resume");
  
  await User.create({
    ...userPayload,
    session_id: sessionID
  });
  
  return res.send();
};

export default {
  newUser
}