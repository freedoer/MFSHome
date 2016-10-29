import {Sequelize, sequelize} from './base';
import ArticleType from './article-type'
const Article = sequelize.define('article', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT
  },
  createAt:{
  	type:Sequelize.BIGINT,
  },
  updateAt:{
  	type:Sequelize.BIGINT,
  },
  type: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: ArticleType,
      // This is the column name of the referenced model
      key: 'id'
    }
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Role.sync();

export default Role;