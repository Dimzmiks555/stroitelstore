import ProductsService from "../services/ProductsService.js";

class ProductsController {

    async getAll(req, res) {
        try {
            await ProductsService.getAll(req.query, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async getRecent(req, res) {
        try {
            await ProductsService.getRecent(req.query, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    
    async getPrices(req,res) {
        try {
            await ProductsService.getPrices(req.query, data => {
                res.send(data)
            });
            res.status(200)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res) {
        try {
            await ProductsService.getOne(req.params.id, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async createAvrora(req, res) {
        try {
            await ProductsService.createAvrora(req.file, req.body);
            res.status(200)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}


export default new ProductsController();