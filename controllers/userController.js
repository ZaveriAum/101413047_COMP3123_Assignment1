const service = require('../services/userServices')

const create = (req, res, next)=>{
    service.create(req, res, next)
}

module.exports.create = create