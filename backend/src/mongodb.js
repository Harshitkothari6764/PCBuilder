const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = "mongodb+srv://dax:Dax@12345@cluster0.h4tc1.mongodb.net/pcbData?retryWrites=true&w=majority"
const databseName = "pcbData"

mongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(error)
    }

    const db = client.db(databseName)
    db.collection('users').insertOne({
        name: "varshil",
        email: "varshilpatel1498@gmail.com"
    }, (error, result) => {
        if (error){
            return console.log(error)
        }

        console.log(result)
    })

    console.log("connected")
})
