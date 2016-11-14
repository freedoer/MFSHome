import {Sequelize, sequelize} from './base';
const ArticleType = sequelize.define('article_type', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
  },
  desc: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

ArticleType.sync();

export {ArticleType};