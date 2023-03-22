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
import type { Models } from '.';
import { User } from './user';

class Address extends 
  Model<
    InferAttributes<Address>, 
    InferCreationAttributes<Address>
  >
{
  declare id: CreationOptional<number>;
  declare street: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare zip: CreationOptional<number>;
  declare user_id: ForeignKey<User['id']>

  // associations 

  public static associate(models: Models): void {
    console.log("AddressModel associate logic running in hurr");

    Address.belongsTo(models.User, {
      foreignKey: "user_id",
    });

    return;
  }
};

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true
    }
  },
  {
    tableName: 'addresses',
    sequelize
  }
);

export { Address };