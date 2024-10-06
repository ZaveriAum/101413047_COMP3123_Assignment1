const service = require('../services/userServices')

const signup = (req, res, next)=>{
    service.signup(req, res, next)
}

const login = (req, res, next)=>{
    service.login(req, res, next)
}

const user_info = (req, res, next)=>{
    service.user_info(req, res, next)
}

const authenticateToken = (req, res, next)=>{
    service.authenticateToken(req, res, next)
}

module.exports.signup = signup
module.exports.login = login
module.exports.user_info = user_info
module.exports.authenticateToken = authenticateToken