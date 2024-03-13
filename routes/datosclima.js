import express from "express";
const router = express.Router();

const datosclimaRouter = (pool) => {
    console.log("datosclimaRouter");
    //* get all datosclima
    router.get("/", async (req, res) => {
        try {
            console.log("Get all datosclima");
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

            const q = "INSERT INTO `datosclima` (`horaTomada`,`idArduino`,`temperatura`,`humedad`,`lluvia`,`brillo`) VALUES (?)";

            const values = [
                req.body.horaTomada,
                req.body.idArduino,
                req.body.temperatura,
                req.body.humedad,
                req.body.lluvia,
                req.body.brillo
            ];
            console.log(values)

            await connection.query(q, [values]);
            connection.release();
            console.log("Post datosclima Successfull");
            res.status(200).json({ message: "temperaturaA añadida exitosamente!" });
        } catch (err) {
            console.log("Post datosclima Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    return router;
};

export default datosclimaRouter;