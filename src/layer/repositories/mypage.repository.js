const { Op } = require("sequelize");
const {order} = require("../../sequelize/models");
const {lecture} = require("../../sequelize/models");

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels; 
  }

 findAll = async () => {

    const myorders = await order.findAll({where: {user_id : 1 }})
   return myorders}

  findOne = async (lecture_id) => {
    const mylectures = await lecture.findOne({where: {lecture_id: lecture_id}})
    return mylectures
    
  }

   
}



module.exports = MypageRepository;
