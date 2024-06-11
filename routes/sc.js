import express from "express";
const router = express.Router();

const datosSC = (pool) => {
    console.log("datosSC");
    router.get("/prueba", async (req, res) => {
        console.log("deaaa");
        res.send('Hello, Secure World!');
    });
    

    return router;
};

export default datosSC;