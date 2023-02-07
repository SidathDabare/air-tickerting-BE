/** @format */
import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import usersRouter from "./src/api/users/index.js"
import {
  forbiddenErrorHandler,
  genericErroHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./src/errorHandlers.js"
import filesRouter from "./src/api/files/index.js"
import Stripe from "stripe"
import bodyParser from "body-parser"
import ordersRouter from "./src/api/orders/index.js"
import ticketRouter from "./src/api/ticket/index.js"
import { join } from "path"

// import paymentRouter from "./api/payments/index.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST)
//console.log("STRIPE SK ", process.env.STRIPE_SECRET_TEST)
dotenv.config()
const server = express()
const port = process.env.PORT || 3002
const publicFolderPath = join(process.cwd(), "./pdf")

// ********************************* MIDDLEWARES *****************************
// server.use(cors())
const whitelist = [process.env.FE_PROD_URL, process.env.FE_DEV_URL]
server.use(
  cors({
    origin: (origin, corsNext) => {
      console.log("ORIGIN: ", origin)

      if (!origin || whitelist.indexOf(origin) !== -1) {
        corsNext(null, true)
      } else {
        corsNext(
          createHttpError(
            400,
            `Cors Error! Your origin ${origin} is not in the list!`
          )
        )
      }
    },
  })
)
server.use(express.static(publicFolderPath))
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is listening on port ${port}`)
  })
})

// ********************************** ENDPOINTS ******************************
server.use("/users", usersRouter)
server.use("/files", filesRouter)
server.use("/orders", ordersRouter)
server.use("/ticket", ticketRouter)

server.post("/payment", async (req, res) => {
  let { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "AIR TICKETING Co, ",
      payment_method: id,
      confirm: true,
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true,
    })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment failed",
      success: false,
    })
  }
})

// ******************************** ERROR HANDLERS ***************************
server.use(unauthorizedErrorHandler)
server.use(forbiddenErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErroHandler)
