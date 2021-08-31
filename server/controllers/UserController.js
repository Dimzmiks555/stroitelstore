import UserService from "../services/UserService.js";

class UserController {

    async registration(req, res) {
        try {
            await UserService.registration(req.body);
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async login(req, res) {
        try {
            await UserService.login(req.body);
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async check(req, res) {
        try {
            res.json({message: 'ALL RIGHT'})
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new UserController();