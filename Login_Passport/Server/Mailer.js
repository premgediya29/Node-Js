const Mailer = require('nodemailer')

const transport = Mailer.createTransport({
    service: 'gmail',
    auth: {
        user: "premgediya4225@gmail.com",
        pass: "gcgidzezplgmbrbr"
    }
})

module.exports.sendOtp = (to, otp)=> {
    const mailOptions = {
        from: "premgediya4225@gmail.com",
        to: to,
        subject: "Reset Password Conformation OTP",
        text: `Your Password Recovery OTP is ${otp}`
    }
    transport.sendMail(mailOptions, (err)=> {
        err && console.log(err)
    })
}