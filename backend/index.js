const express = require("express");
const app = express();
const mainRouter = require("./src/routes/index.js");
const cors = require('cors');
const db_connect = require("./src/db.js");

app.use(cors());
app.use(express.json());
db_connect();
const port = 777;

app.use("/api/v1",mainRouter);

app.listen(port,()=>{
    console.log(`Server Up on ${port}`);
})