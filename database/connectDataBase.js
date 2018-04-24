const config = require('./config');
const Sequelize = require('sequelize');

global.Sequelize = new Sequelize(config.database, config.username, config.password, {
   host: config.host,
   dialect: 'mysql',
   pool: {
       max: 5,
       min: 0,
       idle: 30000
   }
});