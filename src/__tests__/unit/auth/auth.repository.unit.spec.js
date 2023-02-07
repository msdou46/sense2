// __tests__/unit/auth/auth.repository.unit.spec.js

const AuthRepository = require("../../../layer/repositories/auth.repository");

let mockAuthModel = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}

let authRepository = new AuthRepository(mockAuthModel);   

describe('Layered Architecture Pattern auth Repository Unit Test', () => {

  beforeEach(() => {
    jest.resetAllMocks(); 
  })

  test('Auth Repository / get_account_by_email', async () => {
    mockAuthModel.findOne = jest.fn(() => {
        return "findOne result"
    });

    const email = "msdou33@gmail.com"
    const result = await authRepository.get_account_by_email(email);

    expect(result).toEqual("findOne result");
    expect(mockAuthModel.findOne).toHaveBeenCalledTimes(1);
    expect(mockAuthModel.findOne).toHaveBeenCalledWith({where: {email: "msdou33@gmail.com"}});
  });
 

  test('Auth Repository / get_account_by_nickname', async () => {
    mockAuthModel.findOne = jest.fn(() => {
        return "findOne result"
    });

    const nickname = "msdou44";
    const result = await authRepository.get_account_by_nickname(nickname);

    expect(result).toEqual("findOne result");
    expect(mockAuthModel.findOne).toHaveBeenCalledTimes(1);
    expect(mockAuthModel.findOne).toHaveBeenCalledWith({ where: {nickname: "msdou44"} });
  });

  test('Auth Repository / insert_user_account', async () => {
    mockAuthModel.create = jest.fn(() => {
        return {user_id: 1, type: 1}
    });

    const email = "msdou60@gmail.com";
    const nickname = "msdou66";
    const password = "12345";
    const salt = "67899";
    const result = await authRepository.insert_user_account(email, nickname, password, salt);

    expect(result).toMatchObject({user_id: 1, type: 1});
    expect(mockAuthModel.create).toHaveBeenCalledTimes(1);
    expect(mockAuthModel.create).toHaveBeenCalledWith({
        email: email,
        nickname: nickname,
        password: password,
        salt: salt,
        type: 1
    })
  });

});