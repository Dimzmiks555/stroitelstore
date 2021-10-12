import AttributesService from "../services/AttributesService.js";
import HitsService from "../services/HitsService.js";

class HitsController {

    async getAll(req, res) {
        try {
            await HitsService.getAll(req.query, data => {
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
            await HitsService.getOne(req.params.id, data => {
                res.send(data)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    async create(req, res) {
        try {
            await HitsService.create(req.body);
            res.status(200).json({message: 'ok'})

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            await HitsService.delete(req.params.id, data => {
                res.sendStatus(200)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new HitsController();