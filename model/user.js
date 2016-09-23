import {Sequelize, sequelize} from './base';
import Role from './role'

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: Role,
      // This is the column name of the referenced model
      key: 'id'
    }
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync();
export default User;