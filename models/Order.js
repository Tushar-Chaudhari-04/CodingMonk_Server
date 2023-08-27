const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    stripeId: {
      type: String,
      requried: true,
    },
    products: {
      type: JSON,
      requried: true,
    },
    user:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
      }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);