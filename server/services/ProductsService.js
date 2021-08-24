// import GroupModel from '../models/GroupModel.js'
// import GoodModel from '../models/GoodModel.js'
// import PricesAndCountsModel from '../models/PricesAndCountsModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
 


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: '1c_base',
    password: "root"
})

class ProductsService {


    async getAll(params ,result) {
        
        let posts_per_page = 20;

        let limit = `0, ${posts_per_page}`, group


        if (params.page) {
            limit = `${posts_per_page * (+params.page - 1)}, ${posts_per_page}`
        }


        let filters = []


        let search = []
        


        if (params.group) {
            filters.push({column: 'group_id', value: params.group})
        }
        if (params.search) {
            search.push({column: 'goods.title', value: `%${params.search}%`})
        }
        if (params.color) {
            filters.push({column: 'color', value: params.group})
        }



        let sql = `
            SELECT goods.guid, goods.title, goods.group_id, groups.title as \`group\`, prices_and_counts.price, prices_and_counts.amount,  prices_and_counts.sku
            FROM \`goods\` 
            JOIN \`groups\` ON groups.guid = goods.group_id 
            JOIN \`prices_and_counts\` ON goods.guid = prices_and_counts.good_guid 
            WHERE prices_and_counts.amount != 0
            ${filters.length > 0 ? filters.map((item) =>  ` AND ${item.column} = '${item.value}' `) : ''} 
            ${search.length > 0 ? search.map((item) =>  ` AND ${item.column} LIKE '${item.value}' `) : ''} 
            LIMIT ${limit} 
        `;


        console.log(sql)

        connection.query(sql, function(err, results) {
            if(err) console.log(err);
            console.log(results)
            result(results)
        })

    }

    async getOne(params ,result) {
        
        let sql = `SELECT goods.guid, goods.title, goods.group_id, groups.title as \`group\`, prices_and_counts.price, prices_and_counts.amount,  prices_and_counts.sku 
         FROM goods 
        JOIN \`groups\` ON goods.group_id = groups.guid
        JOIN \`prices_and_counts\` ON goods.guid = prices_and_counts.good_guid
        WHERE goods.guid = '${params}'`;


        connection.query(sql, function(err, results) {
            if(err) console.log(err);
            result(results)
        })

    }
}


export default new ProductsService();