const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const path = require('path');

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req,res) => {
//     console.log("/////")
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
<<<<<<< Updated upstream
    console.log(`Server is running on port: $2{port}`);
=======
    console.log(`Server is running on port2: ${port}`);
});