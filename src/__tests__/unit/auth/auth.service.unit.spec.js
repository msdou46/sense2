// __tests__/unit/auth/auth.service.unit.spec.js

const AuthService = require("../../../layer/services/auth.service");

let mockAuthModel = {
  get_account_by_email: jest.fn(),
  get_account_by_nickname: jest.fn(),
  check_account_password: jest.fn(),
  insert_user_account: jest.fn(),
}

user_type = {
	1: "normal",
	99: "admin"
}

let authService = new AuthService();  
authService.userModel = mockAuthModel
authService.lectureModel = mockAuthModel
authService.orderModel = mockAuthModel
authService.cartModel = mockAuthModel

describe('Layered Architecture Pattern auth service Unit Test', () => {

  beforeEach(() => {
    jest.resetAllMocks(); 
  })

  test('Auth service / check_effective', async () => {
		const email_1 = "msdou46@gmail.com";
		const nickname_1 = "lololo";
		const password_1 = "12345";
		const confirm_password_1 = "12345";
		await authService.check_effective(email_1, nickname_1, password_1, confirm_password_1);
	});

	test('Auth service / check_effective Error Test', async () => {
		try {
			const email_2 = "msdou46@gmail.com";
			const nickname_2 = "lololo";
			const password_2 = "12345";
			const confirm_password_2 = "1234";
			await authService.check_effective(email_2, nickname_2, password_2, confirm_password_2);
		} catch (err) {
			console.log(err.name);
			console.log(err.message);
		}
	});

  test('Auth service / checking_account', async () => {
    mockAuthModel.get_account_by_email = jest.fn(function () {
			return null
		});
		mockAuthModel.get_account_by_nickname = jest.fn(function () {
			return null
		})

		const email = "msdou46@gmail.com";
		const nickname = "lololo";
		await authService.checking_account(email, nickname);

		expect(mockAuthModel.get_account_by_email).toHaveBeenCalledTimes(1);
		expect(mockAuthModel.get_account_by_nickname).toHaveBeenCalledTimes(1);
  });

	test('Auth service / checking_account Error test', async () => {
		try {
			const email = "msdou46@gmail.com"
			const nickname = "lololo";

			mockAuthModel.get_account_by_email = jest.fn(function () {
				return null
			});
			mockAuthModel.get_account_by_nickname = jest.fn(function () {
				return {
					nickname: "lololo"
				}
			});

			await authService.checking_account(email, nickname);

		} catch (err) {
			expect(mockAuthModel.get_account_by_email).toHaveBeenCalledTimes(1);
			expect(mockAuthModel.get_account_by_nickname).toHaveBeenCalledTimes(1);
		}

		try {
			const email = "msdou46@gmail.com"
			const nickname = "lololo";

			mockAuthModel.get_account_by_email = jest.fn(function () {
				return {
					email: "msdou@gmail.com"
				}
			});
			mockAuthModel.get_account_by_nickname = jest.fn(function () {
				return {
					nickname: "lololo"
				}
			});

			await authService.checking_account(email, nickname);

		} catch (err) {
			expect(mockAuthModel.get_account_by_email).toHaveBeenCalledTimes(1);
		}
	})

  test('Auth service / join_account', async () => {
    mockAuthModel.insert_user_account = jest.fn(function () {
			return {user_id: 1, type: 1 }
		});
		const result = await authService.join_account("msdou@gmail.com", "lololo", "12345");
		expect(mockAuthModel.insert_user_account).toHaveBeenCalledTimes(1);
		expect(result).toEqual({user_id: 1, type: 1 });
  });
	
	// test('Auth service / check_login', async () => {
  //   mockAuthModel.get_account_by_email = jest.fn(function () {
	// 		return null
	// 	});
	// 	const email = "msdou46@gmail.com";
	// 	const password = "12345";
	// 	await authService.check_login(email, password);

  // });
});