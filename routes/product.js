import express from "express";
const router = express.Router();

const productRouter = (pool) => {
    //* get all product
    router.get("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM product Order by isVisible DESC, catSlug ASC, title ASC";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Get all product Successfull");
            res.json(rows);
        } catch (err) {
            console.log("Get all product Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* get products by category
    router.get("/menu/:category", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = `SELECT * FROM product where isVisible = 1 and catSlug = '${req.params.category}' Order by title ASC`;
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get featured products ${req.params.id} Successfull`);
            res.json(rows);
        } catch (err) {
            console.log("Get featured products Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* get featured and visible products
    router.get("/featured", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM product where isFeatured = 1 and isVisible = 1 Order by title ASC";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get featured products ${req.params.id} Successfull`);
            res.json(rows);
        } catch (err) {
            console.log("Get featured products Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* get visible products
    router.get("/visible", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM product where isVisible = 1 Order by title ASC";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get visible products ${req.params.id} Successfull`);
            res.json(rows);
        } catch (err) {
            console.log("Get visible products Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //get one product
    router.get("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "SELECT * FROM product where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log(`Get product ${req.params.id} Successfull`);
            res.json(rows[0]);
        } catch (err) {
            console.log("Get all product Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Add a new product
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q = "INSERT INTO `product` (`id`, `title`, `desc`, `img`, `price`, `options`, `catSlug`) VALUES (?)";
                console.log("req.body: ")
                console.log(req.body);
                const values = [
                    req.body.id,
                    req.body.title,
                    req.body.desc,
                    req.body.img,
                    req.body.price,
                    JSON.stringify(req.body.options),
                    req.body.catSlug
                ];

            await connection.query(q, [values]);
            connection.release();
            console.log("Post product Successfull");
            res.status(200).json({ message: "Producto añadido exitosamente!" });
        } catch (err) {
            console.log("Post product Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //delete product
    router.delete("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const sqlSelect = "delete FROM product where id = '" + req.params.id + "'";
            const [rows, fields] = await connection.query(sqlSelect);
            connection.release();
            console.log("Delete product " + req.params.id + " Successfull");
            res.status(200).json({ message: "Producto Eliminado exitosamente" });
        } catch (err) {
            console.log("Delete product " + req.params.id + " Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* edit product isFeatured
    router.put("/featured/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                isFeatured
            } = req.body;
            const q =
                "UPDATE product SET isFeatured = ? WHERE id = ?";
            const values = [
                isFeatured,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update isFeatured product ${req.params.id} Successfull`)
            res.status(200).json({ message: "Producto Editado exitosamente" });
        } catch (err) {
            console.log(`Update isFeatured product ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //* edit product isFeatured
    router.put("/visible/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                isVisible
            } = req.body;
            const q =
                "UPDATE product SET isVisible = ? WHERE id = ?";
            const values = [
                isVisible,
                id
            ];
            await connection.query(q, values);
            connection.release();
            console.log(`Update isFeatured product ${req.params.id} Successfull`)
            res.status(200).json({ message: "Producto Editado exitosamente" });
        } catch (err) {
            console.log(`Update isVisible product ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit product 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            const {
                title,
                desc,
                img,
                price,
                isFeatured,
                isVisible,
                options,
                catSlug
            } = req.body;
            const q =
                "UPDATE product SET title = ?, `desc` = ?, img = ?, price = ?, isFeatured = ?, isVisible = ?, options = ?, catSlug = ? WHERE id = ?";
            const values = [
                title,
                desc,
                img,
                price,
                isFeatured,
                isVisible,
                JSON.stringify(options),
                catSlug,
                id
            ];

            await connection.query(q, values);
            connection.release();
            console.log(`Update product ${req.params.id} Successfull`)
            res.status(200).json({ message: "Producto Editado exitosamente" });
        } catch (err) {
            console.log(`Update product ${req.params.id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    

    return router;
};

export default productRouter;