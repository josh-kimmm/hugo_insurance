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
} from 'sequelize';
import type { Models } from '.';

import { sequelize } from '../config';
import type { Address } from './address';
import type { Vehicle } from './vehicle';
class User extends 
  Model<
    InferAttributes<User, { omit: 'address' | 'vehicles' }>, 
    InferCreationAttributes<User, { omit: 'address' | 'vehicles' }>
  >
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare first_name: CreationOptional<string>;
  declare last_name: CreationOptional<string>;
  declare dob: CreationOptional<string>;
  declare session_id: string;

  // associations
  declare address?: NonAttribute<Address>;
  declare vehicles?: NonAttribute<Vehicle[]>;
  declare static associations: {
    address: Association<User, Address>;
    vehicles: Association<User, Vehicle>;
  }

  public static associate(models: Models): void {
    console.log("UserModel associate logic running in hurr");

    User.hasOne(models.Address, {
      as: "address",
      foreignKey: "user_id"
    });  

    User.hasMany(models.Vehicle, {
      as: "vehicles",
      foreignKey: "user_id"
    });

    User.addScope(UserScopes.BySessionID, (sessionID: string) => ({
      where: {
        session_id: sessionID
      }
    }));

    User.addScope(UserScopes.AllModels, {
      include: [
        {
          model: models.Address,
          as: "address"
        },
        {
          model: models.Vehicle,
          as: "vehicles"
        }
      ]
    });

    return;
  }
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    session_id: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    tableName: 'users',
    sequelize
  }
)

const UserScopes = {
  BySessionID: "sessionID",
  AllModels: "allModels"
}

export {
  User,
  UserScopes
};