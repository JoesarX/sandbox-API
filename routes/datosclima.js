import express from "express";
const router = express.Router();

const datosclimaRouter = (pool) => {
    //* get all datosclima
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM datosclima";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all datosclima Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* get latest values datosclima
    router.get("/latest/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT t1.*
                    FROM  datosclima t1
                    LEFT JOIN  datosclima t2
                        ON t1.idArduino = t2.idArduino AND t1.horaTomada < t2.horaTomada
                    WHERE t2.id IS NULL;`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all datosclima Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.get("/average/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `
                SELECT 
                    DAYNAME(horaTomada) as dia, 
                    AVG(temperatura) as temperatura, 
                    AVG(humedad) as humedad, 
                    AVG(lluvia) as lluvia, 
                    AVG(brillo) as brillo
                FROM 
                    datosclima
                WHERE 
                    horaTomada >= CURDATE() - INTERVAL 7 DAY
                GROUP BY 
                    dia;
            `;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all datosclima Successful");
            res.json(rows);
        } catch (err) {
            console.log("Get all datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    

    //* get one datosclima
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM datosclima where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            res.json(rows[0]);
        } catch (err) {
            console.log("Get all datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* Add a new datosclima
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();

            // // Extract temperature from the query parameters
            // const temperature = req.query.temp;

            const q = "INSERT INTO `datosclima` (`idArduino`,`temperatura`,`humedad`,`lluvia`,`brillo`) VALUES (?)";

            const values = [
                req.query.idArduino,
                req.query.temperatura,
                req.query.humedad,
                req.query.lluvia,
                req.query.brillo
            ];

            await connection.query(q, [values]);
            connection.release();
            console.log("Post datosclima Successfull");
            res.status(200).json({ message: "temperatura añadida exitosamente!" });
        } catch (err) {
            console.log("Post datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    return router;
};

export default datosclimaRouter;