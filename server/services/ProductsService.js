
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel, GoodsAttributeModel, AttributeModel, DescModel, ImageModel } from '../models/models.js';
 

const sequelize = new Sequelize("1c_base", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
  });


class ProductsService {


    async getAll(params ,result) {
        
        let {limit, page, group_id, search, guid, price , order , ...args} = params

        let query = {}
        let priceFilter = {}

        let filters = []


        for (let key in args) {

            const attr_id = key.slice(7);
            
            const values = args[key].split(',');

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
                nest: true,
                distinct:true, 
                where: query,
                limit, 
                offset,
                include: [
                    ...filters,
                    {
                        model: GroupModel,
                    },
                    {
                        where: priceFilter,
                        model: PricesAndCountsModel,
                    },
                    {
                        model: ImageModel
                    }
                ],
                subQuery:false
            }
            
        } else {
            options = {
                nest: true,
                distinct:true, 
                where: query,
                limit, 
                offset,
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
                        where: priceFilter,
                        model: PricesAndCountsModel,
                    },
                    {
                        model: ImageModel
                    }
                ],
                subQuery:false
            }
        }



        if (order) {
            options.order = [[PricesAndCountsModel, 'price', order]]
        } else {
            options.order = [['title']]
        }


            GoodModel.findAndCountAll(options)
            .then(goods => {
                // console.log(filters)
                // console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));


        


        

        
    }

    getPrices(params, result) {

        let {limit, page, group_id, search, guid, price , order , ...args} = params

        let query = {}
        let priceFilter = {}

        let filters = []


        for (let key in args) {

            const attr_id = key.slice(7);
            
            const values = args[key].split(',');

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
       


        if (guid != null) {

            let arr = guid.split(',')



            query.guid = arr
        };

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
            }
        ] 
        })
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }
}


export default new ProductsService();