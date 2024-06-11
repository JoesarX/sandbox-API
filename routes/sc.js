import express from "express";
const router = express.Router();

const datosSC = (pool) => {
    
    console.log("datosSC");
    router.get("/infoService", async (req, res) => {
        res.json('Hello, these are our current plans: \
            Plan 1: $20 - 2 hours of cleaning \
            Plan 2: $30 - 4 hours of cleaning \
            Plan 3: 50$ - 5 hours of cleaning (Recommended for big houses)');
    });
    

    return router;
};

export default datosSC;