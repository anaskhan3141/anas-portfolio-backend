const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()





const app = express()
app.use(cors());


app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.post('/email', (req, res, next) => {
    console.log('reqested')
    const { name, email, message } = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,//'anas.raheem2002@gmail.com',
            pass: process.env.APP_PASSWORD
        }

    })

    const mailOptions = {
        from: 'anas.raheem2002@gmail.com',
        to: 'anas.raheem2003@gmail.com',
        subject: 'Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(500,'Internal Server Error');
        } else {
            res.send(200,{"res":info.response,"envelope":info.envelope});
        }
    });
})



app.listen(process.env.PORT, () => {

    console.log(`server started on ${process.env.PORT}`)
})

exports.api = functions.https.onRequest(app)





