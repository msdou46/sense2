const { Op } = require("sequelize");

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels;
  }

 findAll = async () => {

    const myorders = await this.mypageModels.findAll({where: {user_id : 1 }})
   return myorders}

  findOne = async (lecture_id) => {
    const mylectures = await this.mypageModels.findOne({where: {lecture_id: lecture_id}})
    return mylectures
    
  }

  findUser = async () => {
    const user = await this.mypageModels.findOne({where: {user_id: 1}})
    return user
  }

   
}



module.exports = MypageRepository;
