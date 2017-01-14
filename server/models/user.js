import bcrypt from 'bcryptjs';

export default module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: false
        },
        password: DataTypes.STRING(100),
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        token: DataTypes.STRING(255),
        facebookToken: DataTypes.STRING(255)
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