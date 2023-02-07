const MainService = require("../../../layer/services/main.service");

let mockMainRepository = {
find_lectures: jest.fn(),
}

let mainService = new MainService();
// mainService의 Repository (이경우 lectureModel)를 Mock Repository로 변경합니다.
mainService.lectureModel = mockMainRepository;

describe('Layered Architecture Pattern Main Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('Main Service find_lectures Method', async () => {

    // find_lectures Method를 실행했을 때, Return 값 입니다.
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

    // Repository의 find_lectures Method를 Mocking하고, find_lectures_ReturnValue를 Return 값으로 변경합니다.
    mockMainRepository.find_lectures = jest.fn(() => {
      return find_lectures_ReturnValue;
    })

    // MainService의 find_lectures Method를 실행합니다.
    const lectures = await mainService.find_lectures();

    expect(lectures).toEqual(
        find_lectures_ReturnValue
    );

    expect(mockMainRepository.find_lectures).toHaveBeenCalledTimes(1);

  });

});



