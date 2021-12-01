const mongoose = require('mongoose')

const connectionURL = "mongodb+srv://dax:Dax@12345@cluster0.h4tc1.mongodb.net/pcbData?retryWrites=true&w=majority"
mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true })
