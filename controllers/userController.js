const service = require('../services/userServices')

const signup = (req, res, next)=>{
    service.create(req, res, next)
}

const login = (req, res, next)=>{
    service.login(req, res, next)
}

module.exports.signup = signup
module.exports.login = login