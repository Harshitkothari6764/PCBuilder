const express = require('express')
const cors = require('cors')
require('./mongoose')
const userRoutes = require('./Routers/user')
const orderRoutes = require('./Routers/orders')
const cartRoutes = require('./Routers/cart')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(orderRoutes)
app.use(cartRoutes)

app.listen(port, ()=>{
    console.log("server is up! on port ", port);
});