// import GroupModel from '../models/GroupModel.js'
// import GoodModel from '../models/GoodModel.js'
// import PricesAndCountsModel from '../models/PricesAndCountsModel.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mysql from 'mysql2'
import Sequelize from "sequelize";
 


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: '1c_base',
    password: "root"
})


const __dirname = dirname(fileURLToPath(import.meta.url));
class OneCService {
    // async create(tenders) {
    //     const createdTenders = await Tenders.create(...post);
    //     return createdTenders;
    // }
    async create(json) {
        
        let data = json

        let classificator = data['Классификатор']
        let catalog = data['Каталог']

        classificator[0]['Группы'][0]['Группа'].forEach(item => {
            let object = {
                guid: item['Ид'][0],
                title: item['Наименование'][0]
            }
            console.log(item)
            const sql = `INSERT INTO \`groups\` (guid, title) VALUES('${object.guid}', '${object.title}')  `;
 
                connection.query(sql, function(err, results) {
                    if(err) console.log(err);
                    console.log(results);
                });

            // GroupModel.create(object)
            // .then((result)=>{
            //     console.log(result)
            // })
            // .catch(err => console.log(err) );

        })

        catalog[0]['Товары'][0]['Товар'].forEach(item => {


            if (item['Группы'] != undefined) {


                let object = {
                    guid: item['Ид'][0],
                    title: item['Наименование'][0],
                    group_id: item['Группы'][0]['Ид'][0],
                }

                

                const sql = `INSERT INTO goods(guid, title, group_id) VALUES('${object.guid}', '${object.title}', '${object.group_id}') ON DUPLICATE KEY UPDATE id = id`;
 
                connection.query(sql, function(err, results) {
                    if(err) console.log(err);
                    console.log(results);
                });

                // GoodModel.create(object)
                // .then((result)=>{
                //     console.log(result)
                // })
                // .catch(err => console.log(err) );

            }

            

        })
        
        

    }


    async createPricesAndCounts(json) {
        
        let data = json


        data['ПакетПредложений'][0]['Предложения'][0]['Предложение'].forEach(item => {
            let object = {
                good_guid: item['Ид'][0],
                sku: item['Артикул'][0],
                unit: item['БазоваяЕдиница'][0]['$']['НаименованиеПолное'],
                price:  item['Цены'][0]['Цена'][0]['ЦенаЗаЕдиницу'][0],
                amount: item['Количество'][0],
            }

            
            
            const sql = `INSERT INTO prices_and_counts(good_guid, sku, unit, price, amount) VALUES('${object.good_guid}', '${object.sku}', '${object.unit}', '${object.price}', ${object.amount}) `;
 
            connection.query(sql, function(err, results) {
                if(err) console.log(err);
                console.log(results);
            });
            

            // PricesAndCountsModel.create(object)
            // .then((result)=>{
            //     console.log(result)
            // })
            // .catch(err => console.log(err) );

        })

        
        

    }

    // async getAll() {
    //     const tenders = await Tenders.find();
    //     return tenders;
    // }
    // async getOne(id) {
    //     if (!id) {
    //         throw new Error('не указан ID')
    //     }
    //     const tender = await Tenders.findOne({id: id});
    //     return tender;
    // }

    // async update(tenders) {
    //     if (!tender._id) {
    //         throw new Error('не указан ID')
    //     }
    //     const updatedTenders = await Tenders.updateOne(
    //         {id: tenders.id},
    //         {
    //             $set: {
    //                 'pos.1' : { start_price : tenders.start_price }
    //             }
    //         }
    //     )
    //     return updatedTenders;
    // }

    // async delete(id) {
    //         if (!id) {
    //             throw new Error('не указан ID')
    //         }
    //         const post = await Tenders.findByIdAndDelete(id);
    //         return post;
    // }
}


export default new OneCService();