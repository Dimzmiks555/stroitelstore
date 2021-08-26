
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
const {Op} = Sequelize
import { GroupModel, GoodModel, PricesAndCountsModel, GoodsAttributeModel, AttributeModel } from '../models/models.js';
 


class ProductsService {


    async getAll(params ,result) {
        
        let {limit, page, group_id, ...args} = params

        let query = {}



        

        let sub_filters = []


        if (group_id != null) query.group_id = group_id;

        // if (id != null) filters.id = id;

        for (let key in args) {
            const attr_id = key.slice(7);
            
            const values = args[key].split(',');

            let attr_filter = [];

            sub_filters.push({
                attr_id: attr_id,
                value: [...values]
            })
        }
        
        let filters = {
            [Op.and] : sub_filters
        }

        // filter_example = {
        //     [Op.and] : [
        //         {
        //             attr_id: 2,
        //             value: ['white', 'blue']
        //         },
        //         {
        //             attr_id: 3,
        //             value: ['70мм']
        //         },
        //     ]
        // }

        
        limit = +limit || 10
        page = page || 1

        let offset = page * limit - limit

        console.log(sub_filters)
        if (sub_filters[0]) {
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
                    where: filters,
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
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else {
            GoodModel.findAndCountAll({
                nest: true,
                distinct:true, 
                include: [
                    {
                        model: GoodsAttributeModel, 
                        // where: filters,
                        include: [
                            {
                                model: AttributeModel
                            }
                        ]
                    },
                    {
                        model: GroupModel
                    },
                    {
                        model: PricesAndCountsModel
                    }
                ],
                where: query,
                limit, 
                offset
            })
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        }


        

        
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