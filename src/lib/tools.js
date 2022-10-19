/** @format */

import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fsExtra from "fs-extra"

const { createWriteStream } = fsExtra

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
console.log("DATA", dataFolderPath)

export const pdfWritableStream = (filename) =>
  createWriteStream(join(dataFolderPath, filename))
