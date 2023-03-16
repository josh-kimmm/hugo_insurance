import { Request, Response } from "express";
import { DAO_User, DAO_Address, DAO_Vehicle } from "../dao";
import { User } from "../db/models/user";
import { Address } from "../db/models/address";
import { Vehicle } from "../db/models/vehicle";

const resume = async (req: Request, res: Response) => {
  const { sessionID } = req;

  const user = await DAO_User.findBySessionId(sessionID);

  if(!user){
    res.status(400).json({ error: `Unable to find User with sessionID: ${sessionID}`});
    return;
  }

  res.json({ user: user });
};

interface UpdateApplicationPayload {
  userPayload: User;
  vehiclePayload: Vehicle[];
  addressPayload: Address;
};

const update = async (req: Request<{}, {}, UpdateApplicationPayload>, res: Response) => {
  const { sessionID, body } = req;
  const { userPayload, vehiclePayload, addressPayload } = body;

  const user = await DAO_User.findBySessionId(sessionID);

  if(!user)
    return res.status(400).json({ error: `Unable to find User with sessionID: ${sessionID}`});

  const userUpdates = await DAO_User.updateUser(user, userPayload);
  const addressUpdates = await DAO_Address.updateAddress(user.address, addressPayload);
  const vehicleUpdates = await DAO_Vehicle.updateVehicles(user.vehicles, vehiclePayload);

  return res.json({ userUpdates, addressUpdates, vehicleUpdates });
};

const submit = async (req: Request, res: Response) => {
  const { sessionID } = req;

  const user = await DAO_User.findBySessionId(sessionID);

  if(!user) 
    return res.status(400).json({ error: `Unable to find User with sessionID: ${sessionID}`});
  
  console.log(`PRETEND WE"RE DOING SOME KIND OF PROCESSING!!`);

  return res.json({ price: (Math.random() * (999) + 1).toFixed(2) });

}

export default {
  resume,
  update,
  submit
}