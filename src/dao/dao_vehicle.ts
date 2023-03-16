import db from "../db";
import { Vehicle } from "../db/models/vehicle";
import { IError } from "../types/error";

const { models } = db;

interface DAO_VehicleType {
  updateVehicles(userVehicles: Vehicle[] | undefined, payload: Vehicle[]) : Promise<{ error: string, updatedVehicles: Vehicle[]} | null>;
};

interface UpdateVehicleRetType extends IError {
  updatedVehicles: Vehicle[]
};

const DAO_Vehicle: DAO_VehicleType = {
  updateVehicles: async (userVehicles, payload) => {
    const vehicleUpdates: UpdateVehicleRetType = {
      error: "",
      updatedVehicles: [],
    }

    if(!payload || payload.length === 0)
      return vehicleUpdates;

    if(!userVehicles || userVehicles.length === 0)
      return vehicleUpdates
    
    for await (const updatedVehicle of payload) {
      const { id: payloadId } = updatedVehicle;

      const currentVehicle = userVehicles.find(vehicle => payloadId === vehicle.id);
      if(!currentVehicle){
        vehicleUpdates.error = `Unable to update vehicle id: ${payloadId}`;
        return vehicleUpdates;
      }

      const newUpdate = await currentVehicle.update(updatedVehicle);

      vehicleUpdates.updatedVehicles.push(newUpdate);
    }

    return vehicleUpdates;
  }
};

export default DAO_Vehicle;