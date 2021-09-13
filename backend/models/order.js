const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        itemId: [
          {
            type: Schema.Types.ObjectId,
            required: true,
          },
        ],

        quantity: [{ type: Number, required: true }],

        title: [{ type: String, required: true }],

        price: [{ type: Number, required: true }],
      },
    ],

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
