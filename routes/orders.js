// import express from "express";
// const router = express.Router();

// const ordersRouter = (pool) => {
//     //* get all orders
//     router.get("/", async (req, res) => {
//         try {
//             const connection = await pool.getConnection();
//             const sqlSelect = "SELECT * FROM orders Order by isVisible DESC, catSlug ASC, title ASC";
//             const [rows, fields] = await connection.query(sqlSelect);
//             connection.release();
//             console.log("Get all orders Successfull");
//             res.json(rows);
//         } catch (err) {
//             console.log("Get all orders Failed. Error: " + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     //* get one orders
//     router.get("/:userEmail", async (req, res) => {
//         try {
//             const connection = await pool.getConnection();
//             const sqlSelect = "SELECT * FROM orders where userEmail = '" + req.params.userEmail + "' Order by createdAt DESC";
//             const [rows, fields] = await connection.query(sqlSelect);
//             connection.release();
//             console.log(`Get orders ${req.params.userEmail} Successfull`);
//             res.json(rows);
//         } catch (err) {
//             console.log("Get all orders Failed. Error: " + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     //* Add a new orders
//     router.post("/", async (req, res) => {
//         try {
//             const connection = await pool.getConnection();
//             const q = "INSERT INTO `orders` (`id`, `price`, `products`, `status`, `intent_id`, `userEmail`) VALUES (?)";

//             //for the id, get the current year, current month, current day, and a 6 digit random number to create an id like this: 2021-0512-123456
//             let id = new Date().getFullYear()
//                 + "-"
//                 + (new Date().getMonth() + 1).toString().padStart(2, '0')
//                 + new Date().getDate().toString().padStart(2, '0')
//                 + "-"
//                 + Math.floor(100000 + Math.random() * 900000);

//             let idUnique = false;
//             while (!idUnique) {
//                 // check if the id is unique
//                 console.log(`checking if order id ${id} is unique`)
//                 const sqlSelect = "SELECT * FROM orders where id = '" + id + "'";
//                 const [rows, fields] = await connection.query(sqlSelect);
//                 if (rows.length == 0) {
//                     console.log("id is unique");
//                     idUnique = true;
//                 } else {
//                     console.log("id is not unique");
//                     id = new Date().getFullYear()
//                         + "-"
//                         + (new Date().getMonth() + 1).toString().padStart(2, '0')
//                         + new Date().getDate().toString().padStart(2, '0')
//                         + "-"
//                         + Math.floor(100000 + Math.random() * 900000);
//                 }
//             }

//             const values = [
//                 id,
//                 req.body.price,
//                 JSON.stringify(req.body.products),
//                 req.body.status,
//                 req.body.intent_id,
//                 req.body.userEmail
//             ];

//             console.log("values: ")
//             console.log(values);

//             await connection.query(q, [values]);
//             connection.release();
//             console.log("Post orders Successfull");
//             res.status(200).json({ message: "orderso añadido exitosamente!" ,orderID: id  });
//         } catch (err) {
//             console.log("Post orders Failed. Error: " + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     //edit orders 
//     router.put("/:id", async (req, res) => {
//         try {
//             const connection = await pool.getConnection();
//             const { id } = req.params;
//             const {
//                 title,
//                 desc,
//                 img,
//                 price,
//                 isFeatured,
//                 isVisible,
//                 options,
//                 catSlug
//             } = req.body;
//             const q =
//                 "UPDATE orders SET title = ?, `desc` = ?, img = ?, price = ?, isFeatured = ?, isVisible = ?, options = ?, catSlug = ? WHERE id = ?";
//             const values = [
//                 title,
//                 desc,
//                 img,
//                 price,
//                 isFeatured,
//                 isVisible,
//                 JSON.stringify(options),
//                 catSlug,
//                 id
//             ];

//             await connection.query(q, values);
//             connection.release();
//             console.log(`Update orders ${req.params.id} Successfull`)
//             res.status(200).json({ message: "orderso Editado exitosamente" });
//         } catch (err) {
//             console.log(`Update orders ${req.params.id} Failed. Error: ` + err);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });



//     return router;
// };

// export default ordersRouter;