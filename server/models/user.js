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
    });

    return User;
};
