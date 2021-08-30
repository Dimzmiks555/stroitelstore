import ImageService from "../services/ImageService.js";

class ImageController {

    async getAll(req, res) {
        try {
            await ImageService.getAll(req.query, data => {
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
            await ImageService.getOne(req.params.id, data => {
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
            console.log(res.file)
            await ImageService.create(req.file);
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new ImageController();