import express from "express";
const router = express.Router();

const datosSC = (pool) => {
    
    console.log("datosSC");
    router.get("/infoService", async (req, res) => {
        res.json('Hello, these are our current plans: \nPlan 1: $20 - 2 hours of cleaning \nPlan 2: $30 - 4 hours of cleaning \nPlan 3: 50$ - 5 hours of cleaning (Recommended for big houses)');
    });
    

    return router;
};

export default datosSC;