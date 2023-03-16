import db from "../db";
import { Address } from "../db/models/address";

const { models } = db;

interface DAO_AddressType {
  updateAddress(currentAddress: Address | undefined, payload: Address) : Promise<Address | null>;
};

const DAO_Address: DAO_AddressType = {
  updateAddress: async (currentAddress, payload) => {
    if(!currentAddress)
      return null;
    
    return await currentAddress.update(payload);
  }
};

export default DAO_Address;