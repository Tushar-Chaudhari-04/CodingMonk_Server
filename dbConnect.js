const mongoose = require("mongoose");

module.exports = async () => {
  //Database Connection
  const mongoURL = process.env.MONGODB_URL;
  const connectMongoDB = await mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Coding Baba MongoDB connected Successfully...");
    })
    .catch((err) => {
      console.log("Error in connecting to Coding Baba MongoDB.", err);
      console.log("Please try after sometime...");
      process.exit(1);               //Use it if mongoDB not connected.Not to use everywhere.
    });
};
