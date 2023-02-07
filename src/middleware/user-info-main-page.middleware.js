const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next();
  }

  const isAccessTokenValidate = validateAccessToken(accessToken);
  if (isAccessTokenValidate === false) {
    res.clearCookie("accessToken");
    return next();
  }

  res.locals.user_id = isAccessTokenValidate.user_id;
  return next();
};

// Access Token을 검증.
function validateAccessToken(accessToken) {
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // 해당 키로 만든 토큰이 아니거나, 유효 기간이 만료되었을 경우 에러가 발생.
    return payload;
  } catch (error) {
    return false;
  }
}
