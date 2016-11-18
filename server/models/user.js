import Sequelize from 'sequelize';
import config from '../../config';

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password
);

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING
});

export default module.exports = {
    sequelize: sequelize,
    User: User
};
