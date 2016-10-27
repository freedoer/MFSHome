const mysql = require('promise-mysql');


const CREATE_STATEMENT = 'CREATE  TABLE IF NOT EXISTS `_mysql_session_store` (`id` VARCHAR(150) NOT NULL, `expires` BIGINT NULL, `data` TEXT NULL, PRIMARY KEY (`id`));'
  , GET_STATEMENT = 'SELECT * FROM `_mysql_session_store` WHERE id  = ?'
  , SET_STATEMENT = 'INSERT INTO _mysql_session_store(id, expires, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE expires=?, data =?'
  , DELETE_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE id  = ?'
  , CLEANUP_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE expires  < ?';

const FORTY_FIVE_MINUTES = 45 * 60 * 1000;


class MysqlStore {
  constructor(options) {
    this.options = options;
    this.init().then();
    setInterval(()=> {
      this.cleanup().then();
    }, 15 * 60 * 1000)
  }

  getExpiresOn(session, ttl) {
    ttl = ttl || FORTY_FIVE_MINUTES;

    if (session && session.cookie && session.cookie.expires) {
      return +session.cookie.expires;
    } else {
      return +new Date() + ttl;
    }
  }

  async init() {
    await this.getConnection().query(CREATE_STATEMENT);
    await this.cleanup();
  }

  getConnection() {
    if (!this.pool) {
      this.pool = mysql.createPool(this.options);
    }
    return this.pool;
  }

  cleanup() {
    return this.getConnection().query(CLEANUP_STATEMENT, [+new Date()]);
  }

  async get(sid) {
    let results = await this.getConnection().query(GET_STATEMENT, [sid]);
    if (results && results[0] && results[0].data) {
      return JSON.parse(results[0].data);
    } else {
      return null;
    }
  }

  async set(sid, session, ttl) {
    let expires = +this.getExpiresOn(session, ttl);
    let data = JSON.stringify(session);
    return await this.getConnection().query(SET_STATEMENT, [sid, expires, data, expires, data]);
  }

  async destroy(sid) {
    return await this.getConnection().query(DELETE_STATEMENT, [sid]);
  }

}

module.exports = MysqlStore;