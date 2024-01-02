const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us9.api.mailchimp.com/3.0/lists/95374c118c"

    const options = {
        method:"POST",
        auth:"rishav007:d7945a428dc58ecd408588fe9197aa15-us9"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })    

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000")
})

// API Key - 19563efe1d0fbee6358512480ab74439-us9
// API Key 2 - d7945a428dc58ecd408588fe9197aa15-us9
// Audience Key - 95374c118c