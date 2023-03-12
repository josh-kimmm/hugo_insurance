import { 
  Model,
  ModelDefined,
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  Optional,
  DataTypes } from 'sequelize';
import { sequelize } from '../config';

// class UserType extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
//   declare id: CreationOptional<number>;
//   declare first_name: String;
//   declare last_name: String;
//   declare email: String;
//   declare 
// }

interface UserAttributes {
  email: string,
  first_name: string,
  last_name: string,
  dob: string
};

type UserCreationAttributes = Optional<UserAttributes, 'first_name' | 'last_name' | 'dob'>

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('Users', {
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
  }
}, 
{});

User.

export default User;