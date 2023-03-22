import db from "../db";
import { Address } from "../db/models/address";
import { User } from "../db/models/user";

const { models, UserScopes } = db;
const { BySessionID, AllModels } = UserScopes;

interface DAO_UserType {
  findBySessionId(sessionID: string) : Promise<InstanceType<typeof User> | null>;
  updateUser(user: User, userPayload: User) : Promise<InstanceType<typeof User> | null>;
}
const DAO_User: DAO_UserType = {
  findBySessionId: async (sessionId) => {
    const ScopedUser = User.scope([{ method: [BySessionID, sessionId]}, AllModels]);
    const user = await ScopedUser.findOne();

    return user;
  },
  updateUser: async (user, userPayload) => {
    if(!user)
      return null;
    
    return await user.update(userPayload);
  }
};

export default DAO_User;