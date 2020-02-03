const mongoose = require("mongoose");

const config = require("config"); //we need acces to the global variable we just created
const db = config.get("mongoURI"); //this will grab the value of mongoURI from default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
