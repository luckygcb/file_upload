const Sequelize = require('sequelize');

let user = global.Sequelize.define('user', {
   id: {
       type: Sequelize.INTEGER,
       primaryKey: true
   },
    username: Sequelize.STRING,
    password: Sequelize.STRING
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = user;