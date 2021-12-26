const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());

// Start the service
app.listen(PORT, () => {
    console.log(`Started at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("API Mahatma Quijano");
});

/* Routes */
// Conjuntos
const conjuntosRoute = require("./routes/conjuntos");
app.use("/conjunto", conjuntosRoute);
// Casas
const casasRoute = require("./routes/casas");
const {handle} = require("express/lib/router");
app.use("/conjunto", casasRoute);

// Database connection
mongoose.connect(
    process.env.MongoDB,
    () => {
        console.log("Success!")
    }
);