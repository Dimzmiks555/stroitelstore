import DeliveryService from "../services/DeliveryService.js";

class DeliveryController {

    async getAll(req, res) {
        try {
            const delivery = await DeliveryService.getAll(req.query, data => {
                // res.send(data)
            });
            res.status(200).json(delivery)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    
    async getOne(req, res) {
        try {
            await DeliveryService.getOne(req.params.id, data => {
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
            console.log(req.body)
            const delivery = await DeliveryService.create(req.body);
            res.status(200).json(delivery)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new DeliveryController();