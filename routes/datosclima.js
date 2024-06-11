import express from "express";
const router = express.Router();

const datosclimaRouter = (pool) => {
    console.log("datosclimaRouter");
    //* get all datosclima
    router.get("/", async (req, res) => {
        res.json('Hello, this is the datosclima endpoint!');
    });

    //* get latest values datosclima
    router.get("/latest/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM datosclima ORDER BY horaTomada DESC LIMIT 1`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get latest datosclima Successfull");
            res.json(rows[0]); // Return the first (and only) row directl
        } catch (err) {
            console.log("Get latest datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    

    router.get("/average/", async (req, res) => {
        console.log("deaaa");
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `
                SELECT 
                id as id,
                DAYNAME(CONVERT_TZ(horaTomada, '+00:00', '-06:00')) as dia, 
                FORMAT(AVG(temperatura), 1) as temperatura, 
                FORMAT(AVG(humedad), 1) as humedad, 
                FORMAT(AVG(lluvia), 1) as lluvia, 
                AVG(brillo) as brillo
                FROM 
                    datosclima
                WHERE 
                    horaTomada >= DATE_SUB(CONVERT_TZ(NOW(), '+00:00', '-06:00'), INTERVAL 7 DAY)
                GROUP BY 
                    dia
                ORDER BY
                    horaTomada DESC;
            `;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get allll datosclima Successful");
            console.log(":)");
            console.log(rows);
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