import db from "../db";
import { Address } from "../db/models/address";

const { models } = db;

interface DAO_AddressType {
  upsertAddress(payload: Address) : Promise<Address | null>;
}; 

const DAO_Address: DAO_AddressType = {
  upsertAddress: async (payload) => {
    if(!payload)
      return null;
    
    const [addressUpdate] = await Address.upsert(payload, {
      returning: true,
    });
    return addressUpdate;
  } 
}; 

export default DAO_Address;