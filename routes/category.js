// import express from "express";
// const router = express.Router();

// const categoryRouter = (pool) => {

//     // // Authentication middleware
//     // const authenticate = (req, res, next) => {
//     //     // Implement your authentication logic here
//     //     const isAuthenticated = true;

//     //     if (isAuthenticated) {
//     //         next(); // Continue to the next middleware or route handler
//     //     } else {
//     //         res.status(403).json({ message: 'You are not allowed!' });
//     //     }
//     // };

//     // // Apply authentication middleware to specific routes
//     // categoryRouter.use(authenticate);

//     //get all category
//     router.get("/", async (req, res) => {
//         try {
//             // const session = req.session;
//             // console.log(session);
//             const connection = await pool.getConnection();
//             const sqlSelect = "SELECT * FROM category ORDER BY FIELD(title, 'Comida', 'Bebida', 'Otros')";
//             const [rows, fields] = await connection.query(sqlSelect);
//             connection.release();
//             console.log("Get all category Successfull");
//             res.json(rows);
//         } catch (err) {
//             console.log("Get all category Failed. Error: " + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     //get all category slugs
//     router.get("/slugs", async (req, res) => {
//         try {
//             console.log("hola");
//             // const session = req.params.session;
//             // console.log(session);
//             const connection = await pool.getConnection();
//             const sqlSelect = "SELECT id, title, slug FROM category ";
//             const [rows, fields] = await connection.query(sqlSelect);
//             connection.release();
//             console.log("Get all category slugs Successfull");
//             res.json(rows);
//         } catch (err) {
//             console.log("Get all category slugs Failed. Error: " + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     return router;
// };

// export default categoryRouter;