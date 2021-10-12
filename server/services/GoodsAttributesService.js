
import { GroupModel, AttributeModel, GoodsAttributeModel } from '../models/models.js';
 


class GoodsAttributesService {



    async create(data) {
        

        GoodsAttributeModel.create({attr_id: data.attr_id, good_id: data.good_id, value: data.value})
        .then(goods => {
            console.log(goods)
            // result(goods)
        }).catch(err=>console.log(err));


    }

    async createBulk(data) {
        


        GoodsAttributeModel.bulkCreate(data)
        .then(goods => {
            console.log(goods)
            // result(goods)
        }).catch(err=>console.log(err));


    }

    async getAll(params ,result) {
        
        let {good_id, group_id, group} = params

        

        if (good_id && group_id) {
            GoodsAttributeModel.findAll({ include: [AttributeModel], where: {good_id, group_id}, group: group})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (!good_id && !group_id) {
            GoodsAttributeModel.findAll({ include: [AttributeModel], group: group})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (good_id && !group_id) {
            GoodsAttributeModel.findAll({ include: [AttributeModel], where: {good_id}, group: group})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else if (!good_id && group_id) {
            GoodsAttributeModel.findAll({ include: [{model: AttributeModel, where: {group_id}, }], group: group})
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