import { User, UserScopes } from "./user";
import { Address } from "./address";
import { Vehicle } from "./vehicle";

import { sequelize } from "../config";

interface Models {
  [index: string]: typeof User | typeof Address | typeof Vehicle;
  User: typeof User;
  Address: typeof Address;
  Vehicle: typeof Vehicle;
};
const models: Models = {
  User,
  Address,
  Vehicle
};

const init = async () => {
  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];
    if (model.associate) {
      model.associate(models);
    } 
  }); 
  
  try {
    await sequelize.sync({ alter: true });
    console.log("successfully synced sequelize models");
  } catch (err) {
    console.error(`Unable to sync sequelize models: ${err}`);
  }
};

init();



export { 
  sequelize,
  models,
  Models,
  UserScopes,
}