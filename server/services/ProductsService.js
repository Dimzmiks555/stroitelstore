
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel, GoodsAttributeModel } from '../models/models.js';
 


class ProductsService {


    async getAll(params ,result) {
        
        let {limit, page, group_id} = params

        let query = {}

        if (group_id != null) query.group_id = group_id;


        limit = +limit || 10
        page = page || 1

        let offset = page * limit - limit

            GoodModel.findAndCountAll({raw: true, include: [GroupModel, PricesAndCountsModel, include: [{model: GoodsAttributeModel, as: 'attr'}]],where: query, limit, offset})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));


        

        
    }

    async getOne(params ,result) {
        
        console.log(params)

        GoodModel.findAll({raw: true, where: {guid: params}, include: [GroupModel, PricesAndCountsModel] })
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }
}


export default new ProductsService();