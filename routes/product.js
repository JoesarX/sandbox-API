import express from "express";
const router = express.Router();

const productRouter = (pool) => {
    //get all product
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

    //Product Type:
    // id: string;
    // title: string;
    // desc: string;
    // img?: string;
    // price: number;
    // isFeatured: boolean;
    // isVisible: boolean;
    // catSlug: string;
    // options?: { title: string; additionalPrice: number }[];

    //Add a new product
    router.post("/", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const q = "INSERT INTO `product` (`id`, `title`, `desc`, `img`, `price`, `isFeatured`, `isVisible`, `catSlug`) VALUES (?)";
                console.log("req.body: ")
                console.log(req.body);

            await connection.query(q, req.body[0]);
            connection.release();
            console.log("Post product Successfull");
            res.json("Categoria añadida exitosamente!");
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
            res.json(rows);
        } catch (err) {
            console.log("Delete product " + req.params.id + " Failed. Error: " + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    //edit product 
    router.put("/:id", async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const { id } = req.params;
            // console.log(id);
            const {
                editedValue
            } = req.body;
            const q =
                "UPDATE product SET Nombre_Categoria = ? WHERE ID = ?";

            console.log(req.body[1] + " " + req.body[0]);
            // console.log(req);
            const values = [
                req.body[0],
                req.body[1]

            ];

            /* console.log(values);
             console.log(values[0]);
             console.log(values[1]);*/
            await connection.query(q, values);
            connection.release();
            console.log(`Put product ${id} Successfull`);
            res.json("Categoría actualizado exitosamente!");

        } catch (err) {
            console.log(`Put product ${id} Failed. Error: ` + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

export default productRouter;