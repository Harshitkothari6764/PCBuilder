const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.patch('/order', auth, async (req, res)=>{
    const allowedUpdates = ["userInformation"]
    const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid operation!')
    }

    try{

        const user = req.user

        if (!user){
            return res.status(400).send('unable to add to cart!')
        }

        //////////////////  calculate price

        let totalPrice = 0
        user.cart.map(order => {
            totalPrice += order.price
        })
        let subtotal = totalPrice
        let tax = totalPrice * 0.13
        let shipping =  0
        if (req.body.userInformation.fastDelivery){
            shipping = 50
        }
        let discount = totalPrice * 0.1

        const price = {
            subtotal: subtotal,
            tax: tax,
            shipping: shipping,
            discount: discount
        }

        //////////////////  add cart to orders

        if (user.cart.length < 1){
            return res.status(400).send(error)
        }

        //////////////////  time

        // const timeNow = new Date()
        // const deliveryTime = 

        var body = { items: [ ...user.cart ], userInformation: req.body.userInformation, price: price  }
        user.orders.push(body)
        user.cart = []
        console.log("order placed ", user)

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

router.get('/getOrders', auth, async(req, res) => {
    try{

        const user = req.user

        if (!user){
            return res.status(400).send('unable to add to cart!')
        }

        return res.status(200).send(user.orders)
    }
    catch(e){
        return res.status(400).send(e)
    }
})

// router.delete('/order/:id', auth, async (req, res) => {

//     const authToken = req.header('Authorization').replace('Bearer ', '')
//     const decode = jwt.verify(authToken, sign)
    
//     try{
//         const orderWithID = await Order.findById(req.params.id)

//         if (!orderWithID){
//             res.status(404).send("Unable to delete!")
//         }

//         if (decode['_id'] === orderWithID.owner.toString()){
//             const ord = await Order.findByIdAndDelete(req.params.id)
//             res.send(ord)
//         }
//         else{
//             res.status(404).send("Unable to delete!")
//         }
//     }catch (e){
//         res.status(400).send(e)
//     }
// })

module.exports = router