import mongoose from "mongoose";

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl)
