
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel } from '../models/models.js';
 


class ProductsService {


    async getAll(params ,result) {
        
        let {limit, page} = params

        limit = limit || 10
        page = page || 1

        let offset = page * limit - limit


        GoodModel.findAndCountAll({raw: true, include: [GroupModel, PricesAndCountsModel], limit, offset})
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));

        
    }

    // async getOne(params ,result) {
        
    //     let sql = `SELECT goods.guid, goods.title, goods.group_id, groups.title as \`group\`, prices_and_counts.price, prices_and_counts.amount,  prices_and_counts.sku 
    //      FROM goods 
    //     JOIN \`groups\` ON goods.group_id = groups.guid
    //     JOIN \`prices_and_counts\` ON goods.guid = prices_and_counts.good_guid
    //     WHERE goods.guid = '${params}'`;


    //     connection.query(sql, function(err, results) {
    //         if(err) console.log(err);
    //         result(results)
    //     })

    // }
}


export default new ProductsService();