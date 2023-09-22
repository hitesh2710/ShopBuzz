function connectDatabase() {
  const mongoose = require("mongoose");

  const uri = "mongodb+srv://Hitesh:vrxm4buoCNFv0ruI@e-commerce.tng4wnc.mongodb.net/?retryWrites=true&w=majority";
  mongoose
    .connect(uri)
    .then((db) => {
      // console.log(db);
      console.log("Connected to db");
    })
    // .catch((err) => {
    //   console.log(err);
    // });
}

module.exports = connectDatabase;
