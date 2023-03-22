import { Request, Response } from "express";
import { IApplicationResponse } from "../types/routes";

import { DAO_User, DAO_Address, DAO_Vehicle } from "../dao";
import { User } from "../db/models/user";
import { Address } from "../db/models/address";
import { Vehicle } from "../db/models/vehicle";

import currentStep from "../utils/currentStep";

const resume = async (
  req: Request<{}, {}, { sessionID: string }>, 
  res: Response<IApplicationResponse>
) => {
  const { sessionID } = req;

  const user = await DAO_User.findBySessionId(sessionID);

  if(!user)
    return res.status(400).json({ error: `Unable to find User with sessionID: ${sessionID}`});

  const { address, vehicles } = user;
  return res.json({
    user,
    address,
    vehicles,
    currentStep: currentStep(user)
  })

};

interface UpdateApplicationPayload {
  user: User;
  vehicles: Vehicle[];
  address: Address;
};

const update = async (req: Request<{}, {}, UpdateApplicationPayload>, res: Response<IApplicationResponse>) => {
  const { sessionID, body } = req;
  const { user: userPayload, vehicles: vehiclePayload, address: addressPayload } = body;

  const user = await DAO_User.findBySessionId(sessionID);

  if(!user)
    return res.status(400).json({ error: `Unable to find User with sessionID: ${sessionID}`});

  let userUpdates;
  if(userPayload)
    userUpdates = await DAO_User.updateUser(user, userPayload);

  let addressUpdates;
  if(addressPayload){
    addressPayload.user_id = user.id;
    addressUpdates = await DAO_Address.upsertAddress(addressPayload);
  }
  
  let vehicleUpdates;
  if(vehiclePayload){
    vehicleUpdates = await DAO_Vehicle.updateVehicles(user, vehiclePayload);
  }
  
  return res.json({ 
    user: userUpdates, 
    address: addressUpdates, 
    vehicles: vehicleUpdates?.updatedVehicles 
  });
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