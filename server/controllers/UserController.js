import UserService from "../services/UserService.js";

class UserController {

    async registration(req, res) {
        try {
            let token = await UserService.registration(req.body);
            res.json({token})
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async login(req, res) {
        try {
            let token = await UserService.login(req.body);
            res.json({token})
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }

    async check(req, res) {
        try {
            console.log(req.user)
            let token = await UserService.check(req.user);
            res.json({token})
            res.status(200)

        } catch (e) {
            // console.log(e);
            res.status(500).json(e)
        }
    }
}


export default new UserController();