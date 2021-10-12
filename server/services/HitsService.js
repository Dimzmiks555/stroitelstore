
import { GroupModel, ImageModel, PricesAndCountsModel, HitModel, GoodModel } from '../models/models.js';
 


class HitsService {

    async create(body) {
        
        // console.log(body)

        HitModel.create({hit: body.hit, good_id: body.good_id})
        .then(goods => {
            console.log(goods)
        }).catch(err=>console.log(err));


    }


    async getAll(params ,result) {
        
        
            GoodModel.findAndCountAll({
                include: [
                    {
                        model: HitModel,
                        where: {hit: true}
                    },
                    {
                        model: PricesAndCountsModel
                    },
                    {
                        model: ImageModel
                    }
                ]
            })
            .then(hits => {
                // console.log(goods)
                result(hits)
            }).catch(err=>console.log(err));
        
        

        
    }

    async getOne(params ,result) {
        
        console.log(params)

        HitModel.findOne({where: {good_id: params}})
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }


    async delete(params ,result) {
        
        console.log(params)

        HitModel.destroy({where: {good_id: params}})
        .then(goods => {
            console.log(goods)
            result(goods)
        }).catch(err=>console.log(err));


    }

}


export default new HitsService();