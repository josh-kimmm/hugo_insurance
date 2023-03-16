import { sequelize } from "./config";
import { models, Models, UserScopes } from "./models";

export { 
  Models
};

export default { 
  sequelize,
  models,
  UserScopes
}