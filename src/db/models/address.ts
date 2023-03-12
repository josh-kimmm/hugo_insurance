import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config';

const Address = sequelize.define('Addresses', {
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
{});

export default Address;