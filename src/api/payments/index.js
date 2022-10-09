/** @format */

import express from "express"
import createError from "http-errors"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST)
const paymentRouter = express.Router()

// paymentRouter.post("/", async (req, res) => {
//   const total = req.body.amount
//   console.log("PAYMENT RECIEVED ", total)

//   const payment = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "EURO",
//   })
//   res.status(201).send({
//     clientSecret: payment.client_secret,
//   })
// })

// paymentRouter.post("/", async (req, res) => {
//   let { product, token } = req.body
//   console.log("PRODUCT", product)
//   console.log("PRICE", product.price)
//   const idempontencyKey = uuidv4()
//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id,
//     })
//     .then((customer) => {
//       stripe.charges.create(
//         {
//           amount: product.price * 100,
//           currency: "EURO",
//           customer: customer.id,
//           receipt_email: token.email,
//           description: product.name,
//         },
//         { idempontencyKey }
//       )
//     })
//     .then((result) => res.status(200).json(result))
//     .catch((err) => console.log(err))
// })
app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
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
export default paymentRouter
