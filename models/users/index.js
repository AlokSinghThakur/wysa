const {DataTypes} = require('sequelize');


module.exports = (db_config) => {
    const user = db_config.define(
        'user',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    len: {
                        args: [6, 128],
                        msg: "Email address must be between 6 and 128 characters in length"
                    },
                    isEmail: {
                        msg: "Email address must be valid"
                    }
                }
            },
            dob: {
                type: DataTypes.STRING,
                allowNull: true,
            },
             gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },            
    });

    return user;
}