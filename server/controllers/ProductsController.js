import ProductsService from "../services/ProductsService.js";

class ProductsController {
    async getAll(req, res) {
        try {
            await ProductsService.getAll();
            res.send("ok");
            res.status(200)
        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new ProductsController();