
import { GroupModel, AttributeModel, DeliveryModel } from '../models/models.js';
 


class DeliveryService {

    async create(body) {
        
        const delivery = await DeliveryModel.create(body)
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
        })

        return delivery

    }


    async getAll(params ,result) {
        

        const {user_id} = params
     
        const delivery = await DeliveryModel.findAll({
            where: {user_id}
        })
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
        })

        return delivery
        

        
    }

    async getOne(params ,result) {
        
        console.log('ЧАВОООО',params)

        DeliveryModel.findAll({
            where: {
                good_id: params
            }
        })
        .then(res => {
            console.log(res)
            result(res)
        })
        .catch(err => {
            console.log(err)
        })

    }
}


export default new DeliveryService();