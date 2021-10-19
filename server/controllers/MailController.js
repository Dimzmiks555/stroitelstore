import MailService from "../services/MailService.js";

class MailController {


    async create(req, res) {
        try {
            await MailService.create(req.body);
            res.status(200).json({message: 'ok'})

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new MailController();