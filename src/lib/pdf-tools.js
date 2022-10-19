/** @format */
import { pipeline } from "stream"
import { promisify } from "util"
import { pdfWritableStream } from "./tools.js"
import fsExtra from "fs-extra"
import pdf from "html-pdf"
import pdfTemplate from "../api/files/documents/index.js"

const { createWriteStream } = fsExtra

export const getPDFReadableStream = (data) => {
  pdf.create(pdfTemplate(data), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject())
    }

    res.send(Promise.resolve())
  })
}

export const generatePDFAsync = async (data) => {
  const source = getPDFReadableStream(data)
  const destination = createWriteStream("result.pdf")

  const promisePipeline = promisify(pipeline)
  await promisePipeline(source, destination)
}
