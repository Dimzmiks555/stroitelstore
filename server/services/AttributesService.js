
import { GroupModel, AttributeModel, PricesAndCountsModel } from '../models/models.js';
 


class AttributesService {

    async create(body) {
        

        AttributeModel.create({title: body.title, group_id: body.group_id})
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }


    async getAll(params ,result) {
        


        AttributeModel.findAndCountAll({raw: true, include: [GroupModel]})
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));

        

        
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