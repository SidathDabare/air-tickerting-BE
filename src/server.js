/** @format */

import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import usersRouter from "./api/users/index.js"
import {
  forbiddenErrorHandler,
  genericErroHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers.js"
import filesRouter from "./api/files/index.js"
import Stripe from "stripe"
import bodyParser from "body-parser"
import ordersRouter from "./api/orders/index.js"
import ticketRouter from "./api/ticket/index.js"

// import paymentRouter from "./api/payments/index.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST)
//console.log("STRIPE SK ", process.env.STRIPE_SECRET_TEST)
const server = express()
const port = process.env.PORT || 3001

// ********************************* MIDDLEWARES *****************************
server.use(cors())
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))

// ********************************** ENDPOINTS ******************************
server.use("/users", usersRouter)
server.use("/files", filesRouter)
server.use("/orders", ordersRouter)
server.use("/ticket", ticketRouter)

server.post("/payment", cors(), async (req, res) => {
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

mongoose.connect(process.env.MONGO_CONNECTION_STRING)

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is listening on port ${port}`)
  })
})
