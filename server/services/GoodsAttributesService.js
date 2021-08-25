
import { GroupModel, AttributeModel, GoodsAttributeModel } from '../models/models.js';
 


class GoodsAttributesService {


    async getAll(params ,result) {
        
        let {good_id, group_id} = params



        if (good_id && group_id) {
            GoodsAttributeModel.findAll({raw: true, include: [AttributeModel], where: {good_id, group_id}})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (!good_id && !group_id) {
            GoodsAttributeModel.findAll({raw: true, include: [AttributeModel]})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (good_id && !group_id) {
            GoodsAttributeModel.findAll({raw: true, include: [AttributeModel], where: {good_id}})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (!good_id && group_id) {
            GoodsAttributeModel.findAll({raw: true, include: [AttributeModel], where: {group_id}})
            .then(goods => {
                console.log(goods)
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


export default new GoodsAttributesService();