// __tests__/unit/auth.controller.unit.spec.js

const jwt = require("jsonwebtoken");

const {AuthControllerApi} = require("../../../layer/controllers/auth.controller");

let mockAuthService = {
  check_effective: jest.fn(),
  checking_account: jest.fn(),
  join_account: jest.fn(),
  make_jwt_token: jest.fn(),
  check_login: jest.fn(),
}

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
	cookie: jest.fn(),
  status: jest.fn(),
  json: jest.fn(),
};

let authController = new AuthControllerApi();
// postsController의 Service를 Mock Service로 변경합니다.
authController.authService = mockAuthService;

describe('Layered Architecture Pattern Auth Controller Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse
    });
  })


  test('Auth Controller / user_register', async () => {
		const params = {
			email : "msdou46@gmail.com",
			nickname : "lololo",
			password : "12345",
			confirm_password : "12345"
		};

		const join_account_result = {user_id: 1, type: 1};

		mockRequest.body = params;
		mockAuthService.check_effective = jest.fn(() => {
			return true;
		});
		mockAuthService.checking_account = jest.fn(() => {
			return true;
		});
		mockAuthService.join_account = jest.fn(() => {
			return join_account_result;
		});
		mockAuthService.make_jwt_token = jest.fn(() => {
			const accessToken = jwt.sign(
				{ user_id: join_account_result.user_id, account_type: "normal" }, 
				process.env.JWT_SECRET_KEY, 
				{ expiresIn: '60s', algorithm : "HS256"});
			return accessToken;
		});

		await authController.user_register(mockRequest, mockResponse);

		expect(mockAuthService.check_effective).toHaveBeenCalledTimes(1);
		expect(mockAuthService.check_effective).toHaveBeenCalledWith(
      params.email,
      params.nickname,
      params.password,
      params.confirm_password
    );
		expect(mockAuthService.checking_account).toHaveBeenCalledTimes(1);
		expect(mockAuthService.checking_account).toHaveBeenCalledWith(
      params.email,
      params.nickname
    );
		expect(mockAuthService.join_account).toHaveBeenCalledTimes(1);
		expect(mockAuthService.join_account).toHaveBeenCalledWith(
			params.email,
      params.nickname,
      params.password
		);
		expect(mockAuthService.make_jwt_token).toHaveBeenCalledTimes(1);
		expect(mockAuthService.make_jwt_token).toHaveBeenCalledWith({...join_account_result});

		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith({success: true});
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  
	test('Auth Controller / user_login', async () => {
		const params = {
			email : "msdou46@gmail.com",
			password : "12345"
		};
		const check_login_result = {user_id: 1, type: 1};

		mockRequest.body = params;

		mockAuthService.check_login = jest.fn(() => {
			return check_login_result
		});
		mockAuthService.make_jwt_token = jest.fn(() => {
			const accessToken = jwt.sign(
				{ user_id: check_login_result.user_id, account_type: "normal" }, 
				process.env.JWT_SECRET_KEY, 
				{ expiresIn: '60s', algorithm : "HS256"});
			return accessToken;
		});

		await authController.user_login(mockRequest, mockResponse);

		expect(mockAuthService.check_login).toHaveBeenCalledTimes(1);
		expect(mockAuthService.check_login).toHaveBeenCalledWith(
      params.email,
      params.password
    );
		expect(mockAuthService.make_jwt_token).toHaveBeenCalledTimes(1);
		expect(mockAuthService.make_jwt_token).toHaveBeenCalledWith({...check_login_result});

		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith({success: true});
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

	});

});