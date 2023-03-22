import db from "../db";
import { Vehicle } from "../db/models/vehicle";
import { User } from "../db/models/user";
import { IError } from "../types/error";

const { models } = db;

interface DAO_VehicleType {
  updateVehicles(user: User, payload: Vehicle[]) : Promise<UpdateVehicleRetType | null>;
};

interface UpdateVehicleRetType extends IError {
  updatedVehicles: Vehicle[]
};

const DAO_Vehicle: DAO_VehicleType = {
  updateVehicles: async (user, payload) => {
    const vehicleUpdates: UpdateVehicleRetType = {
      error: "",
      updatedVehicles: [],
    }

    if(!user || !payload || payload.length === 0)
      return vehicleUpdates;
    
    for await (const updatedVehicle of payload) {
      const { id: payloadId } = updatedVehicle;

      updatedVehicle.user_id = user.id;
      const currentVehicle = user.vehicles?.find(vehicle => payloadId === vehicle.id);
      if(!currentVehicle){
        const newVehicle = await Vehicle.create(updatedVehicle);
        vehicleUpdates.updatedVehicles.push(newVehicle);
        continue;
      }

      const newUpdate = await currentVehicle.update(updatedVehicle);

      vehicleUpdates.updatedVehicles.push(newUpdate);
    }

    return vehicleUpdates;
  }
};

export default DAO_Vehicle;