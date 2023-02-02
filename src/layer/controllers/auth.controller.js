const AuthService = require("../services/auth.service");

// 랜더링 용
class AuthControllerRender {
    authService = new AuthService;

    get_page_login = async (req, res) => {
        res.render("auth/login");
    };

    get_page_register = async (req, res) => {
        res.render("auth/register");
    }
}

// api 용
class AuthControllerApi {
    authService = new AuthService;

    user_register = async (req, res) => {
        
    };

    user_login = async (req, res) => {
        
    };
}

module.exports = { AuthControllerRender, AuthControllerApi };