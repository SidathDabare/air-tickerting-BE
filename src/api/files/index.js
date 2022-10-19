/** @format */

import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
// import { buildPDF } from "../../lib/pdf-service.js"
import pdf from "html-pdf"

import pdfTemplate from "./documents/index.js"
import path from "path"
import { sendRegistrationEmail } from "../../lib/email-tools.js"
import { generatePDFAsync } from "../../lib/pdf-tools.js"

export const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
    params: async (req, file) => {
      return {
        folder: "airTicketing",
      }
    },
  }),
  limits: { fileSize: 1024 * 1024 },
}).single("image")

const filesRouter = express.Router()

//http://localhost:3001/files/cloudinary
filesRouter.post("/cloudinary", cloudinaryUploader, async (req, res, next) => {
  try {
    console.log("REQ FILE: ", req.file)
    res.status(201).send({ url: req.file.path })
  } catch (error) {
    next(error)
  }
})
// filesRouter.get("/pdf", (req, res) => {
//   try {
//     pdf
//       .create(document, options)
//       .then((res) => {
//         console.log(res)
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   } catch (error) {
//     console.log(error)
//   }
// })
// filesRouter.get("/pdf", (req, res, next) => {
//   const stream = res.writeHead(200, {
//     "Content-Type": "application/pdf",
//     "Content-Disposition": `attachment;filename=invoice.pdf`,
//   })
//   pdf(
//     (chunk) => stream.write(chunk),
//     () => stream.end()
//   )
// })
filesRouter.post("/pdf", (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`pdf/${req.body.data.id}.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject())
      }

      res.send(Promise.resolve())
    })
})
filesRouter.get("/fetch-pdf/:bookId", (req, res) => {
  //res.sendFile(`${__dirname}/result.pdf`)
  res.sendFile(path.resolve(`result.pdf`))
})

filesRouter.post("/email", async (req, res, next) => {
  try {
    // 1. receive user's data from req.body
    const { email, subject, text, html } = req.body
    // 2. save new user in db
    // 3. send email to new user
    await sendRegistrationEmail(email, subject, text, html)
    res.send({ message: "User registered and email sent!" })
  } catch (error) {
    next(error)
  }
})

// filesRouter.post("/asyncPDF", async (req, res, next) => {
//   try {
//     const source = req.body

//     const destination = await generatePDFAsync(source)
//     await sendEmailWithAttachment(destination)
//     res.send()
//   } catch (error) {
//     next(error)
//   }
// })

export default filesRouter
