const userModel = require('../model/user');
function create(user = {}) {
    return userModel.create({
        username: user.username,
        password: user.password
    })
}
create({username: 'xiaoming', password: '456'});
module.exports = {
    create: create
};