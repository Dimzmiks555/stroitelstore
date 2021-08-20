import OneCService from "./OneCService.js";

class OneCController {
    async create(req, res) {
        try {
            await OneCService.create(req.body);
            res.send("ok");
            res.status(200)
        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            // const tenders = await TendersService.getAll();
            res.send('OK');
        } catch (e) {
            res.status(500).json(e)
        }
    }
    // async getOne(req, res) {
    //     try {
    //         const tender = await TendersService.getOne(req.params.id)
    //         console.log(req.params.id);
    //         return res.json(tender)
    //     } catch (e) {
    //         res.status(500).json(e)
    //     }
    // }
    // async update(req, res) {
    //     try {
    //         const updatedTender = await TendersService.update(req.body);
    //         return res.json(updatedTender);
    //     } catch (e) {
    //         res.status(500).json(e)
    //     }
    // }
    // async delete(req, res) {
    //     try {
    //         const post = await PostService.create(req.params.id);
    //         return res.json(post)
    //     } catch (e) {
    //         res.status(500).json(e)
    //     }
    // }
}


export default new OneCController();