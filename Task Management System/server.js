
const { app, connection } = require('./index');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors());

const server = app.listen(port, async () => {
    try {
        await connection;
        console.log(`DB is connected and server is running on port ${port}`);
    } catch (error) {
        console.error("DB connection error: ", error);
    }
});

module.exports = server;
