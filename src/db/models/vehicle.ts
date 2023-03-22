import { 
  Association, 
  CreationOptional, 
  DataTypes, 
  HasManyHasAssociationMixin, 
  InferAttributes, 
  InferCreationAttributes, 
  Model, 
  HasManyHasAssociationsMixin,
  NonAttribute,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../config';
import { User } from './user';
import type { Models } from '.';

class Vehicle extends 
  Model<
    InferAttributes<Vehicle>, 
    InferCreationAttributes<Vehicle>
  >
{
  declare id: CreationOptional<number>;
  declare vin: string; 
  declare year: CreationOptional<string>;
  declare make: CreationOptional<string>;
  declare model: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>

  // associations

  public static associate(models: Models): void {
    console.log("VehicleModel associate logic running in hurr");

    Vehicle.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    return;
  }
};

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vin: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER,
    },
    make: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'vehicles',
    sequelize
  }
)


export { Vehicle };