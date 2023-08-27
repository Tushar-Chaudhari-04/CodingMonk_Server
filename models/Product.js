const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      requried: true,
    },
    course: {
      type: String,
      requried: true,
    },
    courseImg: {
      type:String,
      requried: true,
    },
    courseMRP: {
      type: Number,
      requried:true,
    },
    courseSP: {
      type: Number,
      requried:true,
    },
    courseEMI: {
      type: String,
      requried: true,
    },
    buyFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
