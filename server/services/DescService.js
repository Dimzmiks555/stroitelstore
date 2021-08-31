
import { GroupModel, AttributeModel, DescModel } from '../models/models.js';
 


class DescService {

    async create(body) {
        
        DescModel.findOrCreate({
            where: {good_id: body.good_id},
            defaults: body
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    }


    async getAll(params ,result) {
        
     

        

        
    }

    async getOne(params ,result) {
        
        console.log('ЧАВОООО',params)

        DescModel.findAll({
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


export default new DescService();