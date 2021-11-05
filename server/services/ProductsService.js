
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel, GoodsAttributeModel, AttributeModel, DescModel, ImageModel, HitModel } from '../models/models.js';
import HitsService from './HitsService.js';
import path from 'path'
import XLSX from 'xlsx'


var __dirname = path.resolve();

console.log(__dirname)

const sequelize = new Sequelize("1c_base", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
  });


class ProductsService {

    async createAvrora(file, body) {
        console.log(body.name, file)

        let endObject = [];

        let xlsxPath = `${__dirname}/uploads/${file.filename}`

        xlsxPath = xlsxPath.replace(/\\/g, '/')

        console.log(xlsxPath)

        var workbook = XLSX.readFile(xlsxPath);
        console.log(workbook)
        var sheet_name_list = workbook.SheetNames;

        sheet_name_list.forEach((item, index) => {
            if (index <= 10) {
                var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[index]]);

                xlData.forEach((item, index) => {


                    if (item['__EMPTY'] == 'размер') {
                        

                        for (let key in xlData[index - 1]) {

                            
                            // console.log(index)
                            // console.log(xlData[index - 1]) 

                            let sku 
                            let title

                            if (xlData[index - 1][key].search('https://') == -1) {

                                sku = xlData[index - 1][key] + '-AVRORA'

                                let sizes = []



                                    
                                // console.log(xlData[index])


                                let glasses = []
                                let prices = []
                                let prices900 = []

                                if (xlData[index][key] == 'размер' ) {
                                    let indexSIZE = key.slice(8, key.length)
                                    
                                    sizes = sizes.concat(xlData[index + 1][indexSIZE == '' ? '__EMPTY' : `__EMPTY_${indexSIZE}`]?.substring(0, xlData[index + 1][indexSIZE == '' ? '__EMPTY' : `__EMPTY_${indexSIZE}`].length - 1).split('\n')) 
                                    sizes = sizes.concat(xlData[index + 2][indexSIZE == '' ? '__EMPTY' : `__EMPTY_${indexSIZE}`]) 

                                    for (let i = indexSIZE == '' ? 1 : +indexSIZE; i < +indexSIZE + 4; i++) {
                                        
                                        
                                        // if (indexSIZE == '') {
                                            
                                        //         console.log(sku)
                                        //     // if (xlData[index][`__EMPTY`] == 'размер') {
                                            
                                        //     //     // xlData[index][indexSIZE == '' ? '__EMPTY' : `__EMPTY_${i}`].split('\n').forEach(item => {
                                        //     //     //     // console.log(item.split(' '))
                                                    
                                        //     //     //     glasses = glasses.concat(item.split(', '))
                                        //     //     // })
                
                                                
                                        //     // }
                                        // } else {
                                            // console.log(xlData[index]) 
                                            // console.log(i)
                                            if (xlData[index][`__EMPTY_${i}`] != 'размер') {

                                                let localGlasses = []


                                                xlData[index][`__EMPTY_${i}`]?.split('\n').forEach(item => {
                                                    // console.log(item.split(' '))
                                                    // console.log(i)
                                                    
                                                    glasses = glasses.concat(item.split(', '))
                                                    localGlasses = localGlasses.concat(item.split(', '))
                                                    // console.log(glasses)
                                                })
                                                // console.log(localGlasses.length)
                                                localGlasses.forEach(item => {
                                                    prices.push(xlData[index + 1][`__EMPTY_${i}`])
                                                    prices900.push(xlData[index + 2][`__EMPTY_${i}`])
                                                })
                                                
                                            }
                                        // }

                                        
                                        
                                    glasses = glasses.map(str => {
                                        return str.replace(',', '')
                                    })

                                    }


                                    // console.log(indexSIZE, xlData[index + 1][indexSIZE == '' ? '__EMPTY' : `__EMPTY_${indexSIZE}`])


                                }


                            

                                
                                // console.log(glasses)

                                    
                                    // console.log(sizes)


                                        
                                sizes.forEach(size => {
                                    
                                    glasses.forEach((glass, index) => {
                                            
                                        let colors = ['Эшвайт', 'Венге', 'Ясень ривьeра грей', 'Ясень ривьера айс', 'Грей', 'Орех', 'Беленый дуб', 'Бетон серый', 'Бетон снежный', 'Роял Вуд Белый']

                                        colors.forEach(color => {

                                            if (+size == 40 ) {
                                                size = 400
                                            } else if (+size == 80 ) {
                                                size = 800
                                            } 

                                            title = `Межкомнатная дверь ${sku.replace('-AVRORA', '')}, цвет ${color}, ширина ${size} мм, остекление: ${glass}`
                                            if (+size == 900) {
                                                endObject.push({
                                                    title,
                                                    width: +size,
                                                    price: prices900[index],
                                                    count: 1,
                                                    sku,
                                                    glass,
                                                    group: 'Межкомнатные двери',
                                                    color,
                                                    group_id: 'e4288d53-b14d-11eb-943b-18c04d2a3938'
                                                })
                                            } else {
                                                endObject.push({
                                                    title,
                                                    width: +size,
                                                    price: prices[index],
                                                    count: 1,
                                                    sku,
                                                    glass,
                                                    group: 'Межкомнатные двери',
                                                    color,
                                                    group_id: 'e4288d53-b14d-11eb-943b-18c04d2a3938'
                                                })
                                            }
                                        })

                                        

                                        
                                    })
                                })


                                



                            }





                        }

                    }



                })
            }




            // console.log(xlData);
        })

        console.log(endObject, endObject.length)

        async function createGoods(obj) {
            // const good = await GoodModel.findOne({where: { guid: obj.guid }})

            // if (!good) {
                await GoodModel.upsert(obj).then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            // } else {
                
                // console.log(obj.status)
                // if (obj.status == 'Удален') {
                //     GoodModel.destroy({where: { guid: obj.guid }})
                //     .then(res => {
                //         // console.log(res)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })

                // } else {
                    
                //     GoodModel.update({title: obj.title, group_id: obj.group_id},{where: { guid: obj.guid }})
                //     .then(res => {
                //         // console.log(res)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
                // }


                
            // }
        }

        async function createGoodsAndPrices(object) {

            object.price = +object.price * 1.4

            // const prices_and_counts = await PricesAndCountsModel.findOne({where: { good_guid: object.good_guid }})

            // if (!prices_and_counts) {
                await PricesAndCountsModel.upsert(object).then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            // } else {
                // PricesAndCountsModel.update({price: object.price},{where: { good_guid: object.good_guid }})
                // .then(res => {
                //     console.log(res)
                // })
                // .catch(err => {
                //     console.log(err)
                // })
            // }
        }
        async function createAttrs(object, width_attr, glass_attr, color_attr) {

            if (+object.width == 80) {
                object.width = 800
            } else if (+object.width == 40) {
                object.width = 400
            }

            

            console.log(width_attr[0]?.dataValues?.id, glass_attr[0]?.dataValues?.id)

            // const good_width = await GoodsAttributeModel.findOne({where: { good_id: object.newSKU, value: object.width }})

            // if (!good_width) {
                GoodsAttributeModel.upsert({attr_id: width_attr[0]?.dataValues?.id, good_id: object.newSKU, value: object.width})
                .then(goods => {
                    console.log(goods)
                    // result(goods)
                }).catch(err=>console.log(err));
            // } 

            // const good_glass = await GoodsAttributeModel.findOne({where: { good_id: object.newSKU, value: object.glass }})

            // if (!good_glass) {
                

                GoodsAttributeModel.upsert({attr_id: glass_attr[0]?.dataValues?.id, good_id: object.newSKU, value: object.glass.trim()})
                .then(goods => {
                    console.log(goods)
                    // result(goods)
                }).catch(err=>console.log(err));
            // } 

            // const good_color = await GoodsAttributeModel.findOne({where: { good_id: object.newSKU, value: object.color }})

            // if (!good_color) {
                

                GoodsAttributeModel.upsert({attr_id: color_attr[0]?.dataValues?.id, good_id: object.newSKU, value: object.color.trim()})
                .then(goods => {
                    console.log(goods)
                    // result(goods)
                }).catch(err=>console.log(err));
            // } 


            
        }


        const width_ = await AttributeModel.findAll({where: {group_id: 'e4288d53-b14d-11eb-943b-18c04d2a3938', title: 'Ширина' }})

        const glass_ = await AttributeModel.findAll({where: {group_id: 'e4288d53-b14d-11eb-943b-18c04d2a3938', title: 'Вариант остекления' }})

        const color_ = await AttributeModel.findAll({where: {group_id: 'e4288d53-b14d-11eb-943b-18c04d2a3938', title: 'Цвет' }})


        for (var i = 0, len = endObject.length; i < len; i++) {


            
            const {title, count, sku, price, group_id, glass, width, color} = obj

            let newSKU = sku +'-' + color + '-' + glass + '-' + width

            createGoods({
                title, group_id, guid: newSKU
            })
          }

        // endObject.forEach(obj => {

            

        //     createGoods({
        //         title, group_id, guid: newSKU
        //     })

            
        //     // createGoodsAndPrices({
        //     //     sku, unit: 'шт', price, amount: count, good_guid: newSKU
        //     // })


        //     // createAttrs({
        //     //     title, count, sku, price, group_id, glass, width, newSKU, color
        //     // }, width_, glass_, color_)

            


        // })

        




    }

    async getAll(params ,result) {
        
        let {limit, page, group_id, search, guid, price , order, stock, order_by , interdoor, sku ,  ...args} = params

        let query = {
        }
        let priceFilter = {}

        let filters = []


        for (let key in args) {

            const attr_id = key.slice(7);
            
            const values = args[key].split(';');

            filters.push({
                as: `filter_${attr_id}`,
                where: {
                    attr_id: attr_id,
                    value: [...values]
                },
                model: GoodsAttributeModel, 
                include: [
                    {   
                        model: AttributeModel
                    }
                ]
            })
        }
        

        // 
        // {   
        //     // where: filters,
        //     as: 'filter_3',
        //     model: GoodsAttributeModel, 
        //     include: [
        //         {   
        //             model: AttributeModel
        //         }
        //     ]
        // },

        if (stock != null) {
            if (stock == 'instock') {
                priceFilter.amount = {[Sequelize.Op.gt] : 0 };
            } else {
                priceFilter.amount = {[Sequelize.Op.eq] : 0 };
            }
        }

        if (guid != null) {

            let arr = guid.split(',')

            query.guid = arr

        };

        if (group_id != null) query.group_id = group_id;

        if (price != null) {

            let arr = price.split(',');



            priceFilter.price = {[Sequelize.Op.between] : arr }
        };

        // if (priceTo != null) query.price = {[Sequelize.Op.lte] : priceTo };

        if (search != null) query.title = {[Sequelize.Op.like] : `%${search}%` }

        if (sku != null) {
            priceFilter.sku = {[Sequelize.Op.like] : `%${sku}%` }
            
        }

        // Просто делаем подзапрос и сравниваем айдишники

        // const tempSQL = sequelize.dialect.queryGenerator.selectQuery('goods_attributes',{
        //     attributes: ['good_id'],
        //     where: {
        //           attr_id: attr_id,
        //           value: [...values],
        //     }})
        //     .slice(0,-1); // to remove the ';' from the end of the SQL

        // filter_example = {
        //     [Sequelize.Op.and] : [
            // {
            //     guid: [sequelize.literal(`(${tempSQL})`)]
            // },
            // {
            //     guid: [sequelize.literal(`(${tempSQL})`)]
            // }
          // ]
        // }


        // filter_example = {
        //         [Op.and] : [
        //             {
        //                 attr_id: 2,
        //                 value: ['white', 'blue']
        //             },
        //             {
        //                 attr_id: 3,
        //                 value: ['70мм']
        //             },
        //         ]
        //     }


        let options = {}


        
        limit = +limit || 10
        page = page || 1

        

        let offset = page * limit - limit

        console.log(filters)



        
        if (filters[0]) {




            console.log('Фильтры есть')
            console.log(filters[0])

            options = {
                limit, 
                offset,
                nest: true,
                group: ['guid'],
                // distinct:true, 
                where: query,
                include: [
                    ...filters,
                    {
                        model: GroupModel,
                        where: {
                            
                            parent_group: {[Sequelize.Op.not] : null}
                        }
                    },
                    {
                        where: priceFilter,
                        model: PricesAndCountsModel,
                    },
                    {
                        model: ImageModel
                    },
                    {
                        model: HitModel
                    }
                ],
                subQuery:false
            }
            
        } else {
            options = {
                nest: true,
                limit, 
                offset,
                where: query,
                // order: [[PricesAndCountsModel, 'price', 'asc']],
                group: ['guid'],
                // distinct:true, 
                include: [
                    {
                        model: GoodsAttributeModel, 
                        as: 'filter_1',
                        // where: filters,
                        include: [
                            {
                                model: AttributeModel
                            }
                        ],
                        
                    },
                    {
                        model: GroupModel,
                        where: {
                            
                            parent_group: {[Sequelize.Op.not] : null}
                        }
                    },
                    {
                        where: priceFilter,
                        model: PricesAndCountsModel,
                        
                    },
                    {
                        model: ImageModel
                    },
                    {
                        model: HitModel
                    }
                ],
                // limit: [offset, limit]
                subQuery:false
            }
        }


        if (order) {
            options.order = [[PricesAndCountsModel, 'price', order]]
        } else {
            options.order = [['title']]
        }

        if (order_by) {
            options.order = [[order_by, 'asc']]
        } 

        if (interdoor) {
            options.group = ['prices_and_count.sku']
        }

        
        if (sku != null) {
            options.group = undefined
            
        }

            GoodModel.findAndCountAll(options)
            .then(goods => {
                // console.log(filters)
                // console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));


        


        

        
    }

    getPrices(params, result) {

        let {limit, page, group_id, search, guid, price , order, stock, interdoor , ...args} = params

        let query = {
        }
        let priceFilter = {}

        let filters = []


        for (let key in args) {

            const attr_id = key.slice(7);
            
            const values = args[key].split(';');

            filters.push({
                as: `filter_${attr_id}`,
                where: {
                    attr_id: attr_id,
                    value: [...values]
                },
                distinct:true, 
                model: GoodsAttributeModel, 
                include: [
                    {   
                        model: AttributeModel
                    }
                ]
            })
        }
       


        if (guid != null) {

            let arr = guid.split(',')



            query.guid = arr
        };

        
        if (stock != null) {
            if (stock == 'instock') {
                priceFilter.amount = {[Sequelize.Op.gt] : 0 };
            } else {
                priceFilter.amount = {[Sequelize.Op.eq] : 0 };
            }
        }


        if (group_id != null) query.group_id = group_id;

        if (search != null) query.title = {[Sequelize.Op.like] : `%${search}%` }

        if (price != null) {

            let arr = price.split(',');



            priceFilter.price = {[Sequelize.Op.between] : arr }
        };

        let orderList = []

        if (order) {
            orderList = [[PricesAndCountsModel, 'price', order]]
        } else {
            orderList = [['title']]
        }

        
        limit = +limit || 10
        page = page || 1

        let offset = page * limit - limit

        console.log(filters)
        if (filters[0]) {

            console.log('Фильтры есть')
            console.log(filters[0])

            GoodModel.findAll({
                nest: true,
                distinct:true, 
                include: [
                    ...filters,
                    {
                        model: GroupModel,
                    },
                    {
                        model: PricesAndCountsModel,
                        attributes: [
                            [sequelize.fn('MAX', sequelize.cast(sequelize.col('price'), "integer")) , "max"],
                            [sequelize.fn('MIN', sequelize.cast(sequelize.col('price'),"integer")), "min"],
                        ],
                    },
                    
                    
                    {
                        model: DescModel
                    },
                    {
                        model: ImageModel
                    }
                ],
                where: query,
            })
            .then(max => {
                // console.log(filters)
                console.log(max)
                result(max)

            }).catch(err=>console.log(err));



        } else {
            GoodModel.findAll({
                nest: true,
                distinct:true, 
                include: [
                    {   
                        distinct:true, 
                        model: GoodsAttributeModel, 
                        as: 'filter_1',
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
                        attributes: [
                            [sequelize.fn('MAX', sequelize.cast(sequelize.col('price'), "integer")) , "max"],
                            [sequelize.fn('MIN', sequelize.cast(sequelize.col('price'),"integer")), "min"],
                        ],
                        model: PricesAndCountsModel
                    },
                    {
                        model: DescModel
                    },
                    {
                        model: ImageModel
                    }
                ],
                where: query,
            })
            .then(max => {
                console.log(max)
                result(max)
            }).catch(err=>console.log(err));
        }

    }


    async getOne(params ,result) {
        
        console.log(params)

        GoodModel.findAll({
            nest: true, 
            where: {guid: params}, 
            include: [
                {
                    model: GoodsAttributeModel, 
                    as: 'filter_1',
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
                },
                {
                    model: DescModel
                },
                {
                    model: ImageModel
                },
                {
                    model: HitModel
                }
            ] 
        })
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }

    async getRecent(params ,result) {
        
        

        let ids = params.goods.split(',')

        console.log(ids)

        GoodModel.findAll({
            nest: true, 
            where: {guid: ids}, 
            include: [
                {
                    model: GoodsAttributeModel, 
                    as: 'filter_1',
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
                },
                {
                    model: DescModel
                },
                {
                    model: ImageModel
                },
                {
                    model: HitModel
                }
            ],
        })
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }
}


export default new ProductsService();