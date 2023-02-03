const { Op } = require("sequelize");

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels;
  }

 find_orders = async () => {

    const myorders = await this.mypageModels.findAll({where: {user_id : 1 }})
   return myorders}

  find_lectures = async (lecture_id) => {
    const mylectures = await this.mypageModels.findOne({where: {lecture_id: lecture_id}})
    return mylectures
    
  }

  find_user = async () => {
    const user = await this.mypageModels.findOne({where: {user_id: 1}})
    return user
  }

  edit_user = async (nickname, email, user_id) => {
    await this.mypageModels.update({nickname: nickname, email: email},{where:{user_id: user_id}})
  }

  edit_pw = async (user_id, new_pw) => {
    await this.mypageModels.update({password: new_pw},{where:{user_id: user_id}})
  }
  

   
}



module.exports = MypageRepository;
