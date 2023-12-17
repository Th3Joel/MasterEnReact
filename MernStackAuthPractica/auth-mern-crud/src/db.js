import mongoose from "mongoose";

const runDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/merndb");
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error: " + error);
  }
};

export default runDB;
