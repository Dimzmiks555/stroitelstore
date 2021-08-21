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
            console.log(posts_per_page * +params.page - 1)
            limit = `${posts_per_page * (+params.page - 1)}, ${posts_per_page}`
        }

        if (params.group) {
            group = params.group
        }


        let sql = `SELECT * FROM \`goods\` LIMIT ${limit}`;

        connection.query(sql, function(err, results) {
            if(err) console.log(err);
            console.log(results)
            result(results)
        })

    }


}


export default new ProductsService();