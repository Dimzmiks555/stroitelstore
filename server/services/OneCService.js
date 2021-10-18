// import GroupModel from '../models/GroupModel.js'
// import GoodModel from '../models/GoodModel.js'
// import PricesAndCountsModel from '../models/PricesAndCountsModel.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GoodModel, GroupModel, PricesAndCountsModel } from '../models/models.js';
 


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: '1c_base',
    password: "root"
})


const __dirname = dirname(fileURLToPath(import.meta.url));
class OneCService {

    async create(json) {
        
        let data = json

        console.log(json)

        let classificator = data['Классификатор']
        let catalog = data['Каталог']

        let search = ''

        classificator[0]['Группы'][0]['Группа'].forEach(item => {

            let object = {
                guid: item['Ид'][0],
                title: item['Наименование'][0],
                parent_group: null
            }

            
            
            async function createGroups(obj) {
                const group = await GroupModel.findOne({where: { guid: obj.guid }})

                if (!group) {
                    GroupModel.create(obj).then(res => {
                        // console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    GroupModel.update({title: obj.title, guid: obj.guid, parent_group: obj.parent_group},{where: { guid: obj.guid }})
                    .then(res => {
                        // console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }

            createGroups(object)
            
            if (item['Группы']) {

                item['Группы'][0]['Группа'].forEach(subitem => {

                    let subobject = {
                            guid: subitem['Ид'][0],
                            title: subitem['Наименование'][0],
                            parent_group: item['Ид'][0]
                        }

                    createGroups(subobject)

                })

            }

 
            // connection.query(sql, function(err, results) {
            //     if(err) console.log(err);
        
            //     console.log(results);
            // });


        })

        catalog[0]['Товары'][0]['Товар'].forEach((item, index) => {


            if (item['Группы'] != undefined) {


                let object = {
                    guid: item['Ид'][0],
                    title: item['Наименование'][0],
                    group_id: item['Группы'][0]['Ид'][0],
                }


                if (item['$']) { object.status = item['$']["Статус"] }

                console.log(index)

                

                async function createGoods(obj) {
                    const good = await GoodModel.findOne({where: { guid: obj.guid }})

                    if (!good) {
                        GoodModel.create(obj).then(res => {
                            // console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    } else {
                        
                        console.log(obj.status)
                        if (obj.status == 'Удален') {
                            GoodModel.destroy({where: { guid: obj.guid }})
                            .then(res => {
                                // console.log(res)
                            })
                            .catch(err => {
                                console.log(err)
                            })

                        } else {
                            
                            GoodModel.update({title: obj.title, group_id: obj.group_id},{where: { guid: obj.guid }})
                            .then(res => {
                                // console.log(res)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        }


                        
                    }
                }

                createGoods(object)
                // const sql = `INSERT INTO goods(guid, title, group_id) VALUES('${object.guid}', '${object.title}', '${object.group_id}')`;
 
                // connection.query(sql, function(err, results) {
                //     if(err) console.log(err);
                //     console.log(results);
                // });

            }

            console.log(catalog[0]['Товары'][0]['Товар']?.length)

        })
        

        console.log('complete')
    }


    async createPricesAndCounts(json) {
        
        let data = json


        data['ПакетПредложений'][0]['Предложения'][0]['Предложение'].forEach(item => {
            let object = {
                good_guid: item['Ид'][0],
                sku: item['Артикул'][0],
                unit: item['БазоваяЕдиница'][0]['$']['НаименованиеПолное'],
                price:  +item['Цены'][0]['Цена'][0]['ЦенаЗаЕдиницу'][0],
                amount: +item['Количество'][0],
            }

            async function createGoodsAndPrices() {
                const prices_and_counts = await PricesAndCountsModel.findOne({where: { good_guid: object.good_guid }})

                if (!prices_and_counts) {
                    PricesAndCountsModel.create(object).then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    PricesAndCountsModel.update({sku: object.sku, unit: object.unit, price: object.price, amount: object.amount},{where: { good_guid: object.good_guid }})
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }

            createGoodsAndPrices()
            
            // const sql = `INSERT INTO prices_and_counts(good_guid, sku, unit, price, amount) VALUES('${object.good_guid}', '${object.sku}', '${object.unit}', '${object.price}', ${object.amount}) `;
 
            // connection.query(sql, function(err, results) {
            //     if(err) console.log(err);
            //     console.log(results);
            // });
            

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