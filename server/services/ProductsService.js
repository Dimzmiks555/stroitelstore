
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel, GoodsAttributeModel, AttributeModel } from '../models/models.js';
 


class ProductsService {


    async getAll(params ,result) {
        
        let {limit, page, group_id, ...args} = params

        let query = {}

        let filters = args


        if (group_id != null) query.group_id = group_id;

        // if (id != null) filters.id = id;


        console.log(args)
        limit = +limit || 10
        page = page || 1

        let offset = page * limit - limit

        GoodModel.findAndCountAll({
            nest: true,
            distinct:true, 
            include: [{
                model: GroupModel
            },{
                model: PricesAndCountsModel
            }, ],
            include: [{
                model: GoodsAttributeModel, 
                // where: filters,
                include: [{
                    model: AttributeModel
                }]
            }],
            where: query,
            limit, 
            offset
        })
        .then(goods => {
            // console.log(goods)
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