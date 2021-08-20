import GroupModel from '../models/GroupModel.js'
import GoodModel from '../models/GoodModel.js'
import PricesAndCountsModel from '../models/PricesAndCountsModel.js'


class ProductsService {


    async getAll() {
        
        GoodModel.findAll({raw: true})
        .then(users=>{
          console.log(users);
        })
        .catch(err=>console.log(err));

    }


}


export default new ProductsService();