const userModule = require('../../models').userModel;
const { Sequelize } = require('sequelize');

module.exports = {
    async getUserByEmail(email){
        return await userModule.findOne({where:{email:email}})
    },

    async addUser(data){
        return await userModule.create(data)
    },

    async getUserById(id){
        return await userModule.findOne({where:{id:id}})
    },
}