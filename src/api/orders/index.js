/** @format */

import express from "express"
import { JWTAuthMiddleware } from "../../lib/auth/token.js"
import OrdersModel from "./model.js"
import UsersModel from "../users/model.js"

const ordersRouter = express.Router()

// ordersRouter.post("/", JWTAuthMiddleware, async (req, res, next) => {
//   try {
//     const newOrder = new OrdersModel(req.body) // here mongoose validation happens
//     const { _id } = await newOrder.save() // here the validated record is saved
//     res.status(201).send({ _id })
//   } catch (error) {
//     next(error)
//   }
// })
ordersRouter.post(
  "/:userId/tickets",
  JWTAuthMiddleware,
  async (req, res, next) => {
    try {
      const newOrder = new OrdersModel(req.body)
      const { _id } = await newOrder.save()
      const findUser = await UsersModel.findByIdAndUpdate(
        req.params.userId,
        { $push: { tickets: _id } },
        { new: true, runValidators: true }
      )
      if (!findUser)
        return next(
          createHttpError(404, `User with id: ${req.params.userId} not foud`)
        )
      res.status(201).send({ _id })
    } catch (error) {
      next(error)
    }
  }
)
ordersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const orders = await OrdersModel.find()
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
ordersRouter.get("/:userId/tickets", async (req, res, next) => {
  try {
    // const orders = await UsersModel.findById(req.params.userId).populate({
    //   path: "Orders",
    //   strictPopulate: false,
    // })
    const orders = await UsersModel.findById(req.params.userId)
    if (!orders)
      return next(
        createHttpError(404, `User with id: ${req.params.userId} not foud`)
      )
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const orders = await OrdersModel.findById(req.params.orderId)
    if (orders) {
      res.send(orders)
    } else {
      next(createError(404, `Order with id ${req.params.orderId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default ordersRouter
