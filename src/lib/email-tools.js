/** @format */

import sgMail from "@sendgrid/mail"
import fs from "fs"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//let attachFile = fs.readFileSync(`result.pdf`).toString("base64")

export const sendRegistrationEmail = async (
  recipientAddress,
  subject,
  text,
  html,
  id
) => {
  try {
    let attachFile = fs.readFileSync(`pdf/${id}.pdf`).toString("base64")
    const msg = {
      to: recipientAddress,
      from: process.env.SENDER_EMAIL,
      subject,
      text,
      html,
      attachments: [
        {
          content: attachFile,
          filename: `pdf/${id}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    }
    await sgMail.send(msg)
  } catch (error) {
    console.log(error)
  }
}
