import PaymentService from "../services/PaymentService.js";

class PaymentController {

    async getAll(req, res) {
        try {
            await PaymentService.getAll(req.query, data => {
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
            await PaymentService.getOne(req.params.id, data => {
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
            await PaymentService.create(req.body, (result) => {
                res.json(result)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            console.log(req.body)
            console.log(req.params.id)
            await PaymentService.update(req.params.id, req.body, (result) => {
                res.json(result)
            });
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new PaymentController();