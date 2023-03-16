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
  declare street: string;
  declare city: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare zip: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>

  // associations

  public static associate(models: Models): void {
    console.log("AddressModel associate logic running in hurr");

    Address.belongsTo(models.User, {
      foreignKey: "user_id"
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
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'addresses',
    sequelize
  }
)

export { Address };