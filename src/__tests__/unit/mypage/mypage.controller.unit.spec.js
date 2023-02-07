const {MypageControllerApi} = require('../../../layer/controllers/mypage.controller');

let mockMypageService = {
    MypageControllerApi: jest.fn()
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  send: jest.fn(),
  locals: {user_id: 3}
};

let mypageController = new MypageControllerApi();
mypageController.mypageservice = mockMypageService;

describe('Layered Architecture Pattern Mypage Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Main Controller get_my_profile Method by Success', async () => {
    const myprofile_ReturnValue = {
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
    
    mockMypageService.find_user = jest.fn(() =>  myprofile_ReturnValue);
    await mypageController.get_my_profile(mockRequest, mockResponse);
    expect(mockMypageService.find_user).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      profile: myprofile_ReturnValue,
    });
  });

  test('Main Controller get_my_lectures Method by Success', async () => {
    const mylectures_ReturnValue =
      [
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

      mockMypageService.find_orders = jest.fn(() =>  mylectures_ReturnValue);
      await mypageController.get_my_lectures(mockRequest, mockResponse);
      expect(mockMypageService.find_orders).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      mylectures: mylectures_ReturnValue
    });
  });

  test('Main Controller update_my_profile Method by Success', async () => {
    update_RequestBodyParams = {
      original_pw: "1234",
      nickname: "lee",
      email: "lee@gmail.com",
      new_pw: undefined
    };

    mockRequest.body = update_RequestBodyParams;

    const update_profile_ReturnValue = ('프로필을 수정하였습니다')
    const checking_password_ReturnValue = true
    const checking_email_ReturnValue = undefined 
    mockMypageService.edit_profile = jest.fn(() =>  update_profile_ReturnValue);
    mockMypageService.checking_password = jest.fn(() => checking_password_ReturnValue); 
    mockMypageService.checking_email = jest.fn(() => checking_email_ReturnValue);

    await mypageController.update_my_profile(mockRequest, mockResponse);

    expect(mockMypageService.checking_password).toHaveBeenCalledTimes(1);
    expect(mockMypageService.checking_email).toHaveBeenCalledTimes(1);    
    expect( mockMypageService.edit_profile ).toHaveBeenCalledTimes(1);
    
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(
    {message: '프로필을 수정하였습니다'});
  })



});



//   test('Posts Controller createPost Method by Invalid Params Error', async () => {
//     // PostsController의 createPost Method가 실행될 때 에러가 발생하는 Body 입력 인자들입니다.
//     const createPostRequestBodyParamsByInvalidParamsError = {
//       nickname: 'Nickname_InvalidParamsError',
//       password: 'Password_InvalidParamsError',
//     };

//     // 입력 인자를 createPost Method를 실행할 때 삽입하지않고, mockRequest의 body를 설정합니다.
//     mockRequest.body = createPostRequestBodyParamsByInvalidParamsError;

//     // PostsController의 createPost Method를 실행합니다.
//     await postsController.createPost(mockRequest, mockResponse);

//     /** PostsController.createPost 에러 케이스 by InvalidParamsError **/
//     // 1-1. req.body에 들어있는 값을 바탕으로 각 변수들이 객체 구조분해 할당됩니다.
//     // 1-2. 필수로 전달되어야 하는 title 값이 존재하지 않아 InvalidParamsError가 발생합니다.
//     // 1-3. res.status는 1번 호출되고, 400번의 Http Status Code가 호출됩니다.
//     // 2. res.json의 값은 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.


//     // 1-3. res.status는 1번 호출되고, 400번의 Http Status Code가 호출됩니다.
//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(400);

//     // 2. res.json Method가 호출될 때 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.
//     expect(mockResponse.json).toHaveBeenCalledWith({ errorMessage: "InvalidParamsError" })

//   });
// });





