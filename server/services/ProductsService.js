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



        


        if (params.group) {
            filters.push({column: 'group_id', value: params.group})
        }




        console.log(1)

        let sql = `
            SELECT goods.guid, goods.title, goods.group_id, groups.title as \`group\` 
            FROM \`goods\` 
            JOIN \`groups\` ON groups.guid = goods.group_id 
            ${filters.length == 1 ? `WHERE \`${filters[0].column}\` = '${filters[0].value}'` : filters.length > 1 ? filters.map((item, index) => index !== 0 ? ` AND ${item.column} = ${item.value} ` : '') : ''} 
            LIMIT ${limit} 
        `;


        console.log(sql)

        connection.query(sql, function(err, results) {
            if(err) console.log(err);
            console.log(results)
            result(results)
        })

    }


}


export default new ProductsService();