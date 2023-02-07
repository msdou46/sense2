const MainRepository = require("../../../layer/repositories/main.repository");


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockmainModel = {
  findAll: jest.fn()
//   findByPk: jest.fn(),
//   create: jest.fn(),
//   update: jest.fn(),
//   destroy: jest.fn(),
}

let mainRepository = new MainRepository(mockmainModel);

describe('Layered Architecture Pattern Main Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('Main Repository find_lectures Method', async () => {
    mockmainModel.findAll = jest.fn(() => {
        return "findAll Result"
    });

    const main_lectures = await mainRepository.find_lectures();

    // mainModels에 있는 findAll Method는 1번만 실행된다. (몇번 호출되었는지 체크, 이번 경우 1번) 
    expect(mockmainModel.findAll).toHaveBeenCalledTimes(1);
    //tohavebeencalledtimes가 function으로 먹히지 않음

    //mainModels에 있는 findAll Method의 결과값이 바로 return 되어야 한다. 
    expect(main_lectures).toEqual("findAll Result");
  });

});

