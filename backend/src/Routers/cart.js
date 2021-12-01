const express = require('express')
const router = express.Router()
const axios = require('axios')
const auth = require('../middleware/auth')

router.patch('/cart/add', auth, async (req, res)=>{

    const allowedUpdates = ["components", "metadata"]
    const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update))
    var components = null
    var price = 0

    if(!isValidOperation){
        return res.status(400).send('Invalid operation!')
    }

    try{

        const user = req.user

        if (!user){
            return res.status(400).send('unable to add to cart!')
        }

        await axios.get('https://pcbuilding-29503.firebaseio.com/components.json').then((res) => {
            components = res.data
        })

        req.body.components.map( item => { price += components[item.model][0] })

        const product = {...req.body, price: price}

        user.cart.push(product)
        await user.save((error, user)=>{
            if(error){
                console.log(error)
                return res.status(400).send(error)
            }else{
                return res.send()
            }
            
        })

    }catch(e) {
        res.status(400).send(e)
    }
})

router.get('/cart', auth, async (req, res)=>{

    try{

        const user = req.user

        if (!user){
            return res.status(400).send()
        }

        res.send(user.cart)

    }catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router