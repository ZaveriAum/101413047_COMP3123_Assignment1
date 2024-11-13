const service = require('../services/userServices')

// creating user from the given data in the body
const signup = (req, res, next) => {
    service.signup(req, res, next)
}

// logining into the server from the given data in the body
const login = (req, res, next) => {
    service.login(req, res, next)
}

// for jwt validations user_info function
const user_info = (req, res, next) => {
    service.user_info(req, res, next)
}

const logout = (req, res, next) => {
    service.logout(req, res, next)
}

// exporting all the function to the routes
module.exports = {
    signup,
    login,
    user_info,
    logout
};
