const MypageService = require("../../../layer/services/mypage.service");

let mockMypageOrderRepository = {
   find_orders: jest.fn(), 
}

let mockMypageLectureRepository = {
    find_lectures: jest.fn(),
}
let mockMypageUserRepository = {
find_user: jest.fn(),
edit_user: jest.fn(),
find_other_users: jest.fn(),
edit_pw: jest.fn(),
}

let mypageService = new MypageService();

mypageService.lectureModel = mockMypageLectureRepository;
mypageService.orderModel = mockMypageOrderRepository;
mypageService.userModel = mockMypageUserRepository;

describe('Layered Architecture Pattern Mypage Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('Mypage Service find_orders Method', async () => {

    const find_orders_ReturnValue = [{

      dataValues: {
        order_id: 1,
        user_id: 3,
        lecture_id: 1,
        createdAt: new Date('06 October 2011 15:50 UTC'),
        updatedAt: new Date('06 October 2011 15:50 UTC'),
      },
      dataValues:{
        order_id: 2,
        user_id: 3,
        lecture_id: 2,
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      }}]
    
  

    mockMypageOrderRepository.find_orders = jest.fn(() => {
      return find_orders_ReturnValue;
    })

    const find_lectures_ReturnValue = [
        {
          lecture_id: 1,
          lecturer: "lee",
          title: "Title_1",
          content:"test",
          category:1,
          image:"test.img",
          point:"1000",
          createdAt: new Date('06 October 2011 15:50 UTC'),
          updatedAt: new Date('06 October 2011 15:50 UTC'),
        },
        {
          lecture_id: 2,
          lecturer: "lee",
          title: "Title_2",
          content:"test2",
          category:2,
          image:"test2.img",
          point:"1000",
          createdAt: new Date('07 October 2011 15:50 UTC'),
          updatedAt: new Date('07 October 2011 15:50 UTC'),
        },
      ]

      mockMypageLectureRepository.find_lectures = jest.fn(() => {
        return find_lectures_ReturnValue;
      })

    const user_id = 3
    const mylectures = await mypageService.find_orders(user_id);
    

    expect(mylectures).toEqual(
        {mylectures: [find_lectures_ReturnValue]}
    );

    expect(mockMypageOrderRepository.find_orders).toHaveBeenCalledTimes(1);
    expect(mockMypageLectureRepository.find_lectures).toHaveBeenCalledTimes(1);
  });

  test('Mypage Service find_user Method', async () => {
    
    const find_user_ReturnValue = {
      user_id: 3,
      email: "lee@gmail.com",
      nickname:"lee",
      password:"1234",
      salt:"1234",
      type:1,
      point:50000,
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    }
    mockMypageUserRepository.find_user = jest.fn(() => {
    return find_user_ReturnValue; 
  })

  
  const user_id = 3
  const user = await mypageService.find_user(user_id);

  expect(user).toEqual({user: find_user_ReturnValue })

  expect(mockMypageUserRepository.find_user).toHaveBeenCalledTimes(1);
  });

  test('Mypage Service edit_profile Method By edit_pw', async () => {
    const find_user_ReturnValue = {
      user_id: 3,
      email: "lee@gmail.com",
      nickname:"lee",
      password:"1234",
      salt:"E//kkw5hDV0xxt3VSmsWKUGYFQ8gSnru20gTeabEGHc+nw+8e7NdJD9bFF6IJeuK2ORkyoE+/y5iT6GQISAP/g==",
      type:1,
      point:50000,
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    }
    mockMypageUserRepository.find_user = jest.fn(() => {
      return find_user_ReturnValue; 
    })

    const find_new_ReturnValue = {
      user_id: 3,
      email: "lee@gmail.com",
      nickname:"lee",
      password:"omjKFmvJtGaiX1oM0ZWTzLSOjuaH5uX6eHpTsE88/aZuTekBd9gQL1tfdo6ooMmEQfWutypF5fNvBEc704369Q==",
      salt:"E//kkw5hDV0xxt3VSmsWKUGYFQ8gSnru20gTeabEGHc+nw+8e7NdJD9bFF6IJeuK2ORkyoE+/y5iT6GQISAP/g==",
      type:1,
      point:50000,
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    }

    mockMypageUserRepository.edit_pw = jest.fn(() => {
      return find_new_ReturnValue;
    })

    const user_id = 3
    const new_pw = "1234"
    const nickname = "lee"
    const email ="lee@gmail.com"

    const profile = await mypageService.edit_profile(user_id, nickname, email, new_pw)
    expect(mockMypageUserRepository.edit_pw).toHaveBeenCalledTimes(1);
    expect(mockMypageUserRepository.edit_pw).toHaveBeenCalledWith(find_new_ReturnValue.user_id,find_new_ReturnValue.password)
    
    expect(profile).toEqual({ message: "비밀번호를 수정하였습니다"})
    expect(mockMypageUserRepository.find_user).toHaveBeenCalledTimes(1);
  });
  
});


// test('Mypage Service edit_profile Method By edit_user', async () => {
  //   const find_user_ReturnValue = {
  //     user_id: 3,
  //     email: "lee@gmail.com",
  //     nickname:"lee",
  //     password:"1234",
  //     salt:"E//kkw5hDV0xxt3VSmsWKUGYFQ8gSnru20gTeabEGHc+nw+8e7NdJD9bFF6IJeuK2ORkyoE+/y5iT6GQISAP/g==",
  //     type:1,
  //     point:50000,
  //     createdAt: new Date('06 October 2011 15:50 UTC'),
  //     updatedAt: new Date('06 October 2011 15:50 UTC'),
  //   }
  //   mockMypageUserRepository.find_user = jest.fn(() => {
  //     return find_user_ReturnValue; 
  //   })

  //   const find_new_ReturnValue = {
  //     user_id: 3,
  //     email: "kim@gmail.com",
  //     nickname:"kim",
  //     password:"1234",
  //     salt:"E//kkw5hDV0xxt3VSmsWKUGYFQ8gSnru20gTeabEGHc+nw+8e7NdJD9bFF6IJeuK2ORkyoE+/y5iT6GQISAP/g==",
  //     type:1,
  //     point:50000,
  //     createdAt: new Date('06 October 2011 15:50 UTC'),
  //     updatedAt: new Date('06 October 2011 15:50 UTC'),
  //   }

  //   mockMypageUserRepository.edit_user = jest.fn(() => {
  //     return find_new_ReturnValue;
  //   })

  //   const user_id = 3
  //   const new_pw = undefined
  //   const nickname = "kim"
  //   const email ="kim@gmail.com"

  //   const profile = await mypageService.edit_profile(user_id, nickname, email, new_pw)
  //   expect(mockMypageUserRepository.edit_user).toHaveBeenCalledTimes(1);
  //   expect(mockMypageUserRepository.edit_user).toHaveBeenCalledWith(find_new_ReturnValue.nickname,find_new_ReturnValue.email,find_new_ReturnValue.user_id)
    
  //   expect(profile).toEqual({ message: "프로필을 수정하였습니다"})
  //   expect(mockMypageUserRepository.find_user).toHaveBeenCalledTimes(1);
  // });

  // test('Mypage Service checking_email Method By already exist email', async () => {

  //   // findPostById Method를 실행했을 때, 아무런 Post를 찾지 못하도록 수정합니다.
  //   const email = "lee@gmail.com";
  //   const user_id = 3
  //   const other_users_ReturnValue = [{

  //     dataValues: {
  //       user_id: 4,
  //       email: "lee@gmail.com",
  //       nickname: "lee",
  //       password:"1234",
  //       salt:"1234",
  //       type:1,
  //       point:5000,
  //       createdAt: new Date('06 October 2011 15:50 UTC'),
  //       updatedAt: new Date('06 October 2011 15:50 UTC'),
  //     },
  //     dataValues:{
  //       user_id:5,
  //       email: "kim@gmail.com",
  //       nickname: "kim",
  //       password:"1234",
  //       salt:"1234",
  //       type:1,
  //       point:5000,
  //       createdAt: new Date('07 October 2011 15:50 UTC'),
  //       updatedAt: new Date('07 October 2011 15:50 UTC'),
  //     }}]

  //   mockMypageUserRepository.find_other_users = jest.fn(() => {
  //     return other_users_ReturnValue;
  //   });
    
  //   // expect(checking_email).toEqual(other_users_ReturnValue)
  //   // expect(mockMypageUserRepository.find_other_users).toHaveBeenCalledTimes(1);
  //   try {
  //     await mypageService.checking_email(email, user_id);
  //   } catch (err) {
  //     expect(err).toEqual("이미 존재하는 이메입니다.");
  //   }

  // });


  