import bcrypt from 'bcryptjs';

export default module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        token: DataTypes.STRING,
        facebookToken: DataTypes.STRING
    }, {
        instanceMethods: {
            generateHash: function(password) {
                return bcrypt.hashSync(password, 8);
            },
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
        }
    });

    return User;
};
