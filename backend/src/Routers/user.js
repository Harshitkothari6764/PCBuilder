const express = require('express')
const User = require('../models/user')
const router = express.Router()
const sign = "Iwillchangethisanyway"
const jwt = require('jsonwebtoken')

router.post('/user/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        user.tokens = user.tokens.concat({token})
        await user.save()
        
        res.send({user, token})
    }catch(e){
        // console.log(e)
        res.statusMessage = e.code
        res.status(400).send(e)
    }
})

router.post('/user/logout', async (req, res)=>{

    try{
        const authToken = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(authToken, sign)

        const user = await User.findById(decode['_id'])

        if (!user){
            return res.status(400).send('try again!')
        }

        user.tokens = user.tokens.filter((token) => {
            return token.token !== authToken
        })
        
        await user.save((error, user)=>{
            if(error){
                return res.status(500).send(error)
            }else{
                return res.send()
            }  
        })

    }catch(e) {
        res.status(500).send(e)
    }
})

router.post('/user', async (req, res)=>{

    ///// ***************************************************

    // check req.body keys and allow only few of those like name, email, pass

    ///// ***************************************************

    const user = new User(req.body)
    const token = await user.generateToken()

    user.tokens = user.tokens.concat({token})
    user.save().then(
        () => {
            res.send({user, token})
        }
    ).catch((e) => {
        // console.log(e.code)
        res.statusMessage = e.code
        // res.status(400).send(e.message)
        res.status(400).end()
    })
})

module.exports = router