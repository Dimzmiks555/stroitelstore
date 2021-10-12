
import GoodsAttributesService from "../services/GoodsAttributesService.js";

class GoodsAttributesController {

    async create(req, res) {
        try {
            await GoodsAttributesService.create(req.body);
            res.status(200).json({message: 'ok'})

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async createBulk(req, res) {
        try {
            await GoodsAttributesService.createBulk(req.body);
            res.status(200).json({message: 'ok'})

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }


    async getAll(req, res) {
        try {
            await GoodsAttributesService.getAll(req.query, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    
    async getOne(req, res) {
        try {
            await GoodsAttributesService.getOne(req.params.id, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new GoodsAttributesController();