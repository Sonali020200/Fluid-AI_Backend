
const mongoose = require('mongoose');
const { connection } = require('../config/db');

beforeAll(async () => {
  await connection;
});

afterAll(async () => {
  await mongoose.connection.close();
});
