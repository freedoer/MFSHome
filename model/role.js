import {Sequelize, sequelize} from './base';

const Role = sequelize.define('role', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  desc: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Role.sync();

export default Role;