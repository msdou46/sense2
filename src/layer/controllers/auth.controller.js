const AuthService = require("../services/auth.service");

// 랜더링 용
class AuthControllerRender {
  authService = new AuthService();

  get_page_login = async (req, res) => {
    res.render("auth/login");
  };

  get_page_register = async (req, res) => {
    res.render("auth/register");
  };
}

// api 용
class AuthControllerApi {
  authService = new AuthService();

    user_register = async (req, res) => {
        const {email, nickname, password, confirm_password} = req.body;

        try {
            // 유효성 검사
            await this.authService.check_effective(email, nickname, password, confirm_password);
            // 중복 검사
            await this.authService.checking_account(email, nickname);

        } catch (err) {
            console.log(`Error :: [${err.name}] ${err.message} at AuthController(user_register)`);
			return res.status(400).json({success: false, message: err.message});
        }

        try {
            // 회원가입 insert
            const create_user = await this.authService.join_account(email, nickname, password);
            // 가입 후 토큰 발행
            const token = await this.authService.make_jwt_token(create_user);

            res.cookie('accessToken', token);
            res.status(200).json({success: true});
            
        } catch (err) {
            console.log(`Error :: [${err.name}] ${err.message} at AuthController(user_register)`);
			return res.status(500).json({success: false, message: err.message});
        }
    };

    user_login = async (req, res) => {
        const { email, password } = req.body;
		let user_info;

		try {
            // 유저 찾기
			user_info = await this.authService.check_login(email, password);
		} catch (err) {
			console.log(`Error :: [${err.name}] ${err.message}`);
			return res.status(400).json({success: false, message: err.message});
		}

		// 검증 후 토큰 발행
		const token = await this.authService.make_jwt_token(user_info);
		
		res.cookie('accessToken', token); 
		return res.status(200).json({success: true});
    };
}

module.exports = { AuthControllerRender, AuthControllerApi };
