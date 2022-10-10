/** @format */

import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
// import { buildPDF } from "../../lib/pdf-service.js"
import pdf from "html-pdf"

import pdfTemplate from "./documents/index.js"
import path from "path"

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
filesRouter.post("/", cloudinaryUploader, async (req, res, next) => {
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
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject())
    }

    res.send(Promise.resolve())
  })
})
filesRouter.get("/fetch-pdf", (req, res) => {
  //res.sendFile(`${__dirname}/result.pdf`)
  res.sendFile(path.resolve(`result.pdf`))
})

export default filesRouter
