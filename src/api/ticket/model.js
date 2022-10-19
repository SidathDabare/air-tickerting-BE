/** @format */

import mongoose from "mongoose"

const { Schema, model } = mongoose

const ticketSchema = new Schema(
  {
    data: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

export default model("Ticket", ticketSchema)
