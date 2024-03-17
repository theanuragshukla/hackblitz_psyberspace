let mongoose = require('mongoose');
require('dotenv').config()
let auth = require('');


const url = process.env.MONGO_URL;
const database = process.env.DB_NAME || "hackathon";

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${url}/${database}`)
      .then(() => {
        console.log('Database connection successfull');
      })
      .catch(() => {
        console.error('Database connection error');
      });
  }
}

module.exports = new Database();
