// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "../../config/nodemailer"

export default async function handler(req, res) {
  const data =JSON.parse(req.body)

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `Bestellung Electronics`,
      text: "",
      
    })
  } catch (error) {
    
  }
  res.status(200).json({ status: 'Ok' })
}
