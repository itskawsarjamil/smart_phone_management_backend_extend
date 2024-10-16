import { app } from './app';
import mongoose from 'mongoose';
import { Server } from 'http';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 😑 Shutting down... 🚅 🤯');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
