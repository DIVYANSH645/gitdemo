import { Schema, model } from "mongoose";

// Defining the schema for your data
const transactionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;