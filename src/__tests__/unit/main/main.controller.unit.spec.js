const {MainControllerApi} = require('../../../layer/controllers/main.controller');

let mockMainService = {
  MainControllerApi: jest.fn()
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  send: jest.fn(),
};

let mainController = new MainControllerApi();
// postsController의 Service를 Mock Service로 변경합니다.
mainController.mainService = mockMainService;

describe('Layered Architecture Pattern Main Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Main Controller get_lectures_list Method by Success', async () => {
    // MainService의 find_lectures Method를 실행했을 때 Return 값을 변수로 선언합니다.
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

    // MainService의 find_lectures Method를 실행했을 때 Return 값을 find_lectures_ReturnValue 변수로 설정합니다.
    mockMainService.find_lectures = jest.fn(() => find_lectures_ReturnValue);

    // MainController의 get_lectures_list를 실행합니다.
    await mainController.get_lectures_list(mockRequest, mockResponse);

    /** MainController.get_lectures_list 비즈니스 로직 **/
    // 1. MainService의 find_lecture Method를 1회 호출합니다.
    // 2. res.status는 1번 호출되고, 200의 값을 반환합니다.
    // 3. find_lecture Method에서 반환된 posts 변수의 값을 res.send Method를 이용해 { lectures: lectures }의 형식으로 반환합니다.

    // 1. MainService의 find_lectures Method를 1회 호출합니다.
    expect(mockMainService.find_lectures).toHaveBeenCalledTimes(1);

    // 2. res.status는 1번 호출되고, 200의 값을 반환합니다.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. find_lectures Method에서 반환된 lectures 변수의 값을 res.json Method를 이용해 { lectures: lectures}의 형식으로 반환합니다.
    expect(mockResponse.send).toHaveBeenCalledWith({
      lectures: find_lectures_ReturnValue,
    });
  });

});