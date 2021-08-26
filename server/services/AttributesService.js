
import { GroupModel, AttributeModel, PricesAndCountsModel } from '../models/models.js';
 


class AttributesService {

    async create(body) {
        
        // console.log(body)

        AttributeModel.create({title: body.title, group_id: body.group_id})
        .then(goods => {
            console.log(goods)
        }).catch(err=>console.log(err));


    }


    async getAll(params ,result) {
        
        let {group_id} = params

        console.log(params, group_id)

        if (group_id) {
            AttributeModel.findAndCountAll({include: [GroupModel], where: {group_id}})
            .then(goods => {
                // console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else {
            AttributeModel.findAndCountAll({include: [GroupModel]})
            .then(goods => {
                // console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        }

        

        
    }

    async getOne(params ,result) {
        
        // console.log(params)

        // GoodModel.findAll({raw: true, where: {guid: params}, include: [GroupModel, PricesAndCountsModel] })
        // .then(goods => {
        //     console.log(goods)
        //     result(goods)
        // }).catch(err=>console.log(err));


    }
}


export default new AttributesService();