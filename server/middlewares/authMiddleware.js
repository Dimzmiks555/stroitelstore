import jwt from 'jsonwebtoken'

const secret_key = 'SPAIN'

export default function(req, res, next) {


    try {



        const token = req.headers.authorization.split(' ')[1]
        

        if(!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }
        
        const decoded = jwt.verify(token, secret_key)


        req.user = decoded

        next()

    } catch (error) {
        res.status(401).json({error})
    }

}