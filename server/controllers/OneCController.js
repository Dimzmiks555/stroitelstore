import OneCService from "../services/OneCService.js";

class OneCController {
    async create(req, res) {
        try {
            await OneCService.create(req.body);
            res.send("ok");
            res.status(200)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async createPricesAndCounts(req, res) {
        try {
            await OneCService.createPricesAndCounts(req.body);
            res.send("ok");
            res.status(200)
        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new OneCController();