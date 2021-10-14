
import { GroupModel, OrderProductsModel, OrderModel, PricesAndCountsModel, GoodModel, UserModel, PaymentModel } from '../models/models.js';


class OrderService {

    async create(body, result) {
        
        console.log(body.positions)


        await OrderModel.create(body.data)
        .then(order => {
            console.log(order)
            
            body.positions.forEach(item => {


                async function findPrice(result) {
                    await PricesAndCountsModel.findOne({nest:true, where: {good_guid: item.guid}})
                    .then(res => {
                        console.log(res.price)
                        result(res.price)
                    })
                }
                findPrice((price) => {
                    let data = {
                        count: item.count,
                        order_id: order.id,
                        good_id: item.guid,
                        price: +price,
                        total: +price * +item.count
                    }
    
                    console.log(data, price)
    
                    OrderProductsModel.create(data)

                    .then(res => {


                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                });

                
            });

            result(order)
        })
        .catch(err => {
            console.log(err)
        })


    }


    async getAll(params ,result) {
        

        let {user_id} = params

        let query = {}

        if (user_id) query.user_id = user_id

        
     
        OrderModel.findAndCountAll({
            include: [
                {
                    model: OrderProductsModel,
                    include: [
                        {
                            model: GoodModel
                        }
                    ]
                },
                {
                    model: UserModel,
                },
                {
                    model: PaymentModel,
                },
                
            ],
            where: query,
            order: [['createdAt', 'DESC']]
                
            
        })
        .then(res => {
            result(res)
            console.log(res)
        })
        

        
    }

    async getOne(params ,result) {

        OrderModel.findOne({
            include: [
                {
                    model: OrderProductsModel,
                    include: [
                        {
                            model: GoodModel
                        }
                    ]
                },
                {
                    model: PaymentModel,
                },
            ],
            where: {id: params}
        })
        .then(res => {
            result(res)
            console.log(res)
        })
     

    }


    async update(params, data , result) {

        OrderModel.update({status: data?.status}, {
            where: {id: params}
        })
        .then(res => {
            result(res)
            console.log(res)
        })
     

    }
}


export default new OrderService();