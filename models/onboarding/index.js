const {DataTypes} = require('sequelize');


module.exports = (db_config) => {
    const onBoarding = db_config.define(
        'onBoarding',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'User Id already in use!',
                },
            },
            struggleWithSleep:{
                type: DataTypes.STRING,
                allowNull: true
            },
            timeToBed:{
                type: DataTypes.STRING,
                allowNull: true
            },
            timeOffBed:{
                type: DataTypes.STRING,
                allowNull: true
            },
            hoursOfSleep:{
                type: DataTypes.STRING,
                allowNull: true
            }

            
    });

    return onBoarding;
}