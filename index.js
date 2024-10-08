//import modules & files
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./db/db.config");
const routes = require("./routes/routes");

dotenv.config();

//access .env variable
const port = process.env.PORT || 3019;


const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/", routes)

app.get("/", (request, response) => {
    response.status(200).json({
        message: "Backend live 🏃‍♂️🏃‍♂️",
    });
});

//if routes not found 
app.get('*', function (req, res) {
    res.status(404).json({ 'message': "Route not found" });
});
app.post('*', function (req, res) {
    res.status(404).json({ 'message': "Route not found" });
});


// error handler
app.use((err, res) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

// Connect to the database when the application starts
connectToDatabase();

app.listen(port, () => {
    console.log(`Server is running 🏃🏃‍♂️ on port ${port} 😍😍`);
});



