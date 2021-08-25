
// import GoodModel from '../models/GoodModel.js'

import mysql from 'mysql2'
import Sequelize from "sequelize";
import { GroupModel, GoodModel, PricesAndCountsModel } from '../models/models.js';
 


class GroupsService {


    async getAll(params ,result) {
        
        let {parent_group} = params


        if (parent_group) {
            GroupModel.findAndCountAll({raw: true, where: {parent_group}})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        } else {
            GroupModel.findAndCountAll({raw: true})
            .then(goods => {
                console.log(goods)
                result(goods)
            }).catch(err=>console.log(err));
        }

        

        
    }

    async getOne(params ,result) {
        
        // console.log(params)

        // GoodModel.findAll({raw: true, where: {guid: params}, include: [GroupModel, PricesAndCountsModel] })
        // .then(goods => {
        //     console.log(goods)
        //     result(goods)
        // }).catch(err=>console.log(err));


    }
}


export default new GroupsService();