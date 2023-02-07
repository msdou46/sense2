const MypageRepository = require ("../../../layer/repositories/mypage.repository")

let mockmypageModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
}

let mypageRepository = new MypageRepository(mockmypageModel);



describe('Layered Architecture Pattern Mypage Repository Unit Test', () => {
     // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

 test('Mypage Repository find_orders Method', async () => {
    mockmypageModel.findAll = jest.fn(() => {
        return "findAll Result"
    });

    const user_id = 3

    const myorders = await mypageRepository.find_orders(user_id);

    // mypageModels에 있는 findAll Method는 1번만 실행된다. (몇번 호출되었는지 체크, 이번 경우 1번) 
    expect(mockmypageModel.findAll).toHaveBeenCalledTimes(1);

    //mypageModels에 있는 findAll Method의 결과값이 바로 return 되어야 한다. 
    expect(myorders).toEqual("findAll Result");
  });

  test('Mypage Repository find_lectures Method', async () => {
    mockmypageModel.findOne = jest.fn(() => {
        return "findOne Result"
    });

    const lecture_id = 3
    const mylectures = await mypageRepository.find_lectures(lecture_id); 
    expect(mockmypageModel.findOne).toHaveBeenCalledTimes(1);
    expect(mylectures).toEqual("findOne Result");
  });


test('Mypage Repository find_user Method', async () => {
    mockmypageModel.findOne = jest.fn(() => {
        return "findOne Result"
    });

    const user_id = 3
    const user = await mypageRepository.find_user(user_id);
    expect(mockmypageModel.findOne).toHaveBeenCalledTimes(1);
    expect(user).toEqual("findOne Result");
  });

test('Mypage Repository find_other_users Method', async () => {
    mockmypageModel.findAll = jest.fn(() => {
        return "findAll Result"
    });
    const user_id = 3
    const other_users = await mypageRepository.find_other_users(user_id);
    expect(mockmypageModel.findAll).toHaveBeenCalledTimes(1); 
    expect(other_users).toEqual("findAll Result");
  });

test('Mypage Repository edit_user Method', async () => {
    mockmypageModel.update = jest.fn(() => {
        return "update Result"
    });
    const edit_user_params = {
        nickname: "lee", 
        email: "lee@gmail.com",
        user_id: 3
    }
    const edit_profile = await mypageRepository.edit_user(
        edit_user_params.nickname,
        edit_user_params.email,
        edit_user_params.user_id
    );
    expect(mockmypageModel.update).toHaveBeenCalledTimes(1); 
    expect(edit_profile).toEqual("update Result");
    expect(mockmypageModel.update).toHaveBeenCalledWith({
        nickname: edit_user_params.nickname ,
        email:edit_user_params.email},{where: {user_id:edit_user_params.user_id }}
      );

  });

 test('Mypage Repository edit_pw Method', async () => {
    mockmypageModel.update = jest.fn(() => {
      return "update Result"
  });

  const edit_pw_params = {
    user_id: 3,
    new_pw: "1234"} 

    const edit_password = await mypageRepository.edit_pw(
      edit_pw_params.user_id,
      edit_pw_params.new_pw
  );

  expect(mockmypageModel.update).toHaveBeenCalledTimes(1);
  expect(edit_password).toEqual("update Result");
  expect(mockmypageModel.update).toHaveBeenCalledWith(
    {password: edit_pw_params.new_pw},
    {where: {user_id: edit_pw_params.user_id }});

  });

  test('Mypage Repository add_cart Method', async () => {
    mockmypageModel.findOne = jest.fn(() => {
        return "findOne Result"
    });

    mockmypageModel.create = jest.fn(() => {
      return "create Result"
    });


    const user_id = 1
    const lecture_id = 1

    const add_cart = await mypageRepository.add_cart(user_id,lecture_id);

    expect(mockmypageModel.findOne).toHaveBeenCalledTimes(1);
    // expect(mockmypageModel.create).toHaveBeenCalledTimes(1);
    expect(add_cart).toEqual("findOne Result");

  });

  test('Mypage Repository remove_cart Method', async () => {
    mockmypageModel.destroy = jest.fn(() => {
        return "destroy Result"
    });

    const user_id = 1
    const lecture_id = 1

    const remove_cart = await mypageRepository.remove_cart(user_id,lecture_id);

    expect(mockmypageModel.destroy).toHaveBeenCalledTimes(1);

    expect(remove_cart).toEqual("destroy Result");
  });

  test('Mypage Repository cart_list Method', async () => {
    mockmypageModel.findAll = jest.fn(() => {
        return "findAll Result"
    });

    const user_id = 1

    const cart_list = await mypageRepository.cart_list(user_id);

    expect(mockmypageModel.findAll).toHaveBeenCalledTimes(1);

    expect(cart_list).toEqual("findAll Result");

  });
});


  

 




