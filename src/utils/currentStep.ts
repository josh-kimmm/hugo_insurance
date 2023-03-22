import { User } from "../db/models/user";

const { STEP_ORDER } = require("config");

const currentStep = (user: User) => {
  const { email, address, vehicles } = user;

  if(!email)
    return STEP_ORDER[0];
  
  if(!address)
    return STEP_ORDER[1];

  if(!vehicles?.length)
    return STEP_ORDER[2];

  return STEP_ORDER[3];
};

export default currentStep;