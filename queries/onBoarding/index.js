
const { Sequelize, Op, where } = require('sequelize');
const onBoardingModule = require('../../models').onBoarding

module.exports = {

    async addOnBoardigData(data){
        return await onBoardingModule.create(data)
    }
}