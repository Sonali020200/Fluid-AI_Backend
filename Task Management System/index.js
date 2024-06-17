const express = require("express");
const {connection} = require("./config/db");


const app = express();
app.use(express.json());



app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("db is connected");
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch(e){
        console.log(e);
    }
})