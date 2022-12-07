const nodemailer = require("nodemailer")
const {auth} = require("../lib/firebase")

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: email,
        pass
    }
})

export const mailOptions = {
    from: email,
    to: auth.currentUser.email
}