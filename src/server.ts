import { app } from "./app";
import mongoose from "mongoose";
import { Server } from "http";
const port = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("uncaughtException", (err, origin) => {
  console.log("UNCAUGHT EXCEPTION! 😑 Shutting down... 🚅 🤯");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  // Application specific logging, throwing an error, or other logic here
});
