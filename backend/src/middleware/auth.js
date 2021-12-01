const User = require('../models/user')
const sign = "Iwillchangethisanyway"
const jwt = require('jsonwebtoken')

const auth = async (req, res, next)=>{

    try{
        const authToken = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(authToken, sign)
        const user = await User.findOne({_id: decode['_id'], "tokens.token": authToken})

        if (!user){
            throw new Error()
        }

        req.user = user
        next()

    }catch(e) {
        res.status(401).send("authentication failed!")
    }
}

module.exports = auth