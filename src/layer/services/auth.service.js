const AuthRepository = require("../repositories/auth.repository");
const { cart, lecture, order, user } = require("../../sequelize/models/index.js")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const util = require("util");
const nodemailer = require("nodemailer");


// 이메일 인증 번호 임시 저장.
const auth_email_num = {};

class AuthService {
    userModel = new AuthRepository(user);
    lectureModel = new AuthRepository(lecture);
    orderModel = new AuthRepository(order);
    cartModel = new AuthRepository(cart);

    user_type = {
        1: "normal",
        99: "admin"
    }

    check_effective = async (email, nickname, password, confirm_password) => {
        if (!email || !email.includes("@") || !email.includes(".")) {
            const err = new Error("이메일 형식이 올바르지 않습니다.");
            err.name = "WrongEmailError";
            throw err;
		}
        if (!nickname) {
            const err = new Error(`닉네임을 알맞게 입력해 주세요.`);
            err.name = "NoNicknameError";
            throw err;
		}
		if (password !== confirm_password) {
            const err = new Error("패스워드가 일치하지 않습니다.");
            err.name = "WrongPasswordError";
            throw err;
		}
		if (password.length < 4 ) {
			const err = new Error("패스워드가 짧습니다.");
            err.name = "WrongPasswordError";
            throw err;
		}
    }

    checking_account = async (email, nickname) => {
        const check_email = await this.userModel.get_account_by_email(email);
        if (check_email) {
            const err = new Error("이미 존재하는 이메일 입니다.");
            err.name = "DuplicationEmailError";
            throw err;
        } 
        
        const check_nickname = await this.userModel.get_account_by_nickname(nickname);
        if (check_nickname) {
            const err = new Error("이미 존재하는 닉네임 입니다.");
            err.name = "DuplicationNicknameError";
            throw err;
        }
    }

    join_account = async (email, nickname, password) => {
        // 비밀번호 암호화
        const newPassword = await this.crypto_password(password);
        // 회원가입
        const user_id_and_type = await this.userModel.insert_user_account(
            email, nickname, newPassword.newPassword, newPassword.salt
        );
        return user_id_and_type
    }

    check_login = async (email, password) => {
        const account = await this.userModel.get_account_by_email(email);
        if (!account) {
            const err = new Error("찾을 수 없는 이메일 입니다.");
            err.name = "DoesntExistEmailError";
            throw err;
        }

        const inputPassword = await this.check_account_password(password, account.salt);
        if (inputPassword !== account.password) {
            const err = new Error("비밀번호가 일치하지 않습니다.");
            err.name = "NotSamePasswordError";
            throw err;
        }

        return {user_id: account.user_id, type: account.type}
    }

    crypto_password = async (password) => {
        const randomBytesPromise = util.promisify(crypto.randomBytes);
        const pbkdf2Promise = util.promisify(crypto.pbkdf2);
        const buf = await randomBytesPromise(64);
        const salt = buf.toString("base64");
        const hashedPassword = await pbkdf2Promise(password, salt, 100000, 64, "sha512");
        const newPassword = hashedPassword.toString("base64");

        return {newPassword, salt};
    }

    check_account_password = async (password, salt) => {
        const pbkdf2Promise = util.promisify(crypto.pbkdf2);
        const hashedPassword = await pbkdf2Promise(password, salt, 100000, 64, "sha512");
        const encodedHashedPassword = hashedPassword.toString("base64")
        return encodedHashedPassword;
    }

    make_jwt_token = async (user) => {
        const accessToken = jwt.sign(
            { user_id: user.user_id, account_type: this.user_type[user.type] }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '60s', algorithm : "HS256"});
        return accessToken;
    }

    send_email_for_register = async (email) => {
        const auth_num = crypto.randomBytes(3).toString('hex');
        auth_email_num[email] = auth_num;

        const config = {
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: process.env.GOOGLE_MAIL,
            pass: process.env.GOOGLE_PASSWORD
            }
        };

        const data = {
            "from": process.env.GOOGLE_MAIL,
            "to": email,
            "subject": "sense2 회원가입 이메일 인증",
            "text": `인증번호 : ${auth_num}` 
        }

        const send = async (data) => {
            const transporter = nodemailer.createTransport(config);
            transporter.sendMail(data, (err, info) => {
            if (err) {
                console.log(err);
            } 
            transporter.close();
            })
        };

        const r = await send(data);
        return r;
    }

    check_email_auth_code = async (email, auth_code) => {
        if (!auth_email_num.hasOwnProperty(email)) {
            const err = new Error("잘못된 이메일 접근입니다.");
            err.name = "EmailAndAuthCodeNotMatch";
            throw err;
        }

        if (auth_email_num[email] !== auth_code) {
            const err = new Error("인증코드가 알맞지 않습니다.");
            err.name = "WrongEmailAuthCode";
            throw err;
        }

        delete auth_email_num[email];
    }
    
}

module.exports = AuthService;
