import Sequelize from 'sequelize';
import config from '../../config';

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password
);

const User = sequelize.define('user', {
    name: Sequelize.STRING
});

export default {
    sequelize: sequelize,
    User: User
};
