import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
//import nodemailer from "nodemailer";

// import categoryRouter from "./routes/category.js";
// import productRouter from "./routes/product.js";
// import ordersRouter from "./routes/orders.js";
import datosclimaRouter from "./routes/datosclima.js";
import datosSC from "./routes/sc.js";

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.net",
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'ClinicaVictorCruz@gmail.com',
//         pass: 'hljvucilzplqaedf'
//     }
// });

//HEROKU MYSQL CONNECTION
const pool = mysql.createPool({
    host: "qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "sptmvecbo14tafpf",
    password: "fpvd3a8tbsz644ak",
    database: "pic81nxp8zco8xl7",
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
});

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello this is the backend! HOSTED ON AZURE! AUTO DEPLOYED MADE BY JOSUE!");
});

//app.use("/category", categoryRouter(pool)); 
//app.use("/product", productRouter(pool));
//app.use("/orders", ordersRouter(pool));
app.use("/datosclima", datosclimaRouter(pool));
//app.use("/datosSC", datosSC(pool));

// setInterval(() => {
//     console.log("Ping to keep server active");
// }, 4*60000);