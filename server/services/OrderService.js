
import { GroupModel, OrderProductsModel, OrderModel, PricesAndCountsModel, GoodModel } from '../models/models.js';
 import nodemailer from 'nodemailer'

 let transporter = nodemailer.createTransport({
    service: 'gmail', // no need to set host or port etc.
    auth: {
        user: 'stroitel.office@gmail.com',
        pass: '19Lipo82'
    }
});

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


                       transporter.sendMail({
                        from: '"Магазин Строитель" <stroitel.office@gmail.com>',
                        to: 'anodaday@yandex.ru',
                        subject: `Заказ № ${order.id} успешно оформлен!`,
                        text: `Заказ № ${order.id} успешно оформлен! В ближайшее время с Вами свяжется менеджер`,
                        html:
                          `Заказ № ${order.id} успешно оформлен! В ближайшее время с Вами свяжется менеджер`,
                      }, (err, info) => {
                          console.log(err, info)
                      })


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
     
        OrderModel.findAll({
            include: [
                {
                    model: OrderProductsModel,
                    include: [
                        {
                            model: GoodModel
                        }
                    ]
                },
                
            ],
            where: query
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
                
            ],
            where: {id: params}
        })
        .then(res => {
            result(res)
            console.log(res)
        })
     

    }
}


export default new OrderService();