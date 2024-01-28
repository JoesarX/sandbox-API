import express from "express";
const router = express.Router();

const temperaturasRouter = (pool) => {
    //* get all temperaturas
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM temperaturas";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all temperaturas Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all temperaturas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* get one temperaturas
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM temperaturas where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            console.log("Get all temperaturas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* Add a new temperaturas
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            
            // Extract temperature from the query parameters
            const temperature = req.query.temp;
    
            const q = "INSERT INTO `temperaturas` (`temp`) VALUES (?)";
    
            const values = [
                temperature
            ];
    
            await connection.query(q, [values]);
            connection.release();
            console.log("Post temperaturas Successfull");
            res.status(200).json({ message: "temperatura añadida exitosamente!" });
        } catch (err) {
            console.log("Post temperaturas Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    return router;
};

export default temperaturasRouter;