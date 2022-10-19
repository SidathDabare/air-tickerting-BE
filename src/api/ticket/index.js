/** @format */

import express from "express"
import TicketModel from "./model.js"

const ticketRouter = express.Router()

ticketRouter.get("/", async (req, res, next) => {
  try {
    const ticket = await TicketModel.find()
    res.send(ticket)
  } catch (error) {
    next(error)
  }
})

export default ticketRouter
