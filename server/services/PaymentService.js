
import { GroupModel, OrderProductsModel, OrderModel, PricesAndCountsModel, GoodModel, UserModel, PaymentModel } from '../models/models.js';
import { YooCheckout  } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';



class PaymentService {

   async create(body, result) {
       
       console.log(body)


    //    body.data.status = 'waiting_for_payment'

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

           

           const checkout = new YooCheckout({ shopId: '842984', secretKey: 'test_klyiqPckiN92TXRsAjv4gbfaJCIyQZ1NMQPPQmBHQLc' });

           const idempotenceKey = uuidv4();;
           
           const createPayload = {
               amount: {
                   value: `${body?.data?.total}.00`,
                   currency: 'RUB'
               },
               description: `Оплата заказа № ${order.id}`,
               capture: true,
               metadata: {
                    order_id: order.id  
               },
               payment_method_data: {
                   type: 'bank_card'
               },
               confirmation: {
                   type: 'redirect',
                   return_url: `https://stroitelstore.ru/completed_order/${order.id}`
               }
           };
           
           async function createPay() {

                try {
                    const payment = await checkout.createPayment(createPayload, idempotenceKey);
                    console.log(payment)

                    let data = {
                        uuid: payment.id,
                        status: payment.status,
                        order_id: order.id,
                        confirmation_url: payment?.confirmation?.confirmation_url,
                        description: payment.description,
                        refundable: payment.refundable,
                        paid: payment.paid,
                        total: body?.data?.total
                    }


                    PaymentModel.create(data)
                    .then(res => {
                        console.log(res)
                        result(payment)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                } catch (error) {
                    console.error(error);
                }
           }

           createPay()

        //    result(order)
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
               
           ],
           where: {id: params}
       })
       .then(res => {
           result(res)
           console.log(res)
       })
    

   }


   async update(params, data , result) {


        console.log(data)

       PaymentModel.update({
           status: data?.object?.status, 
           paid: data?.object?.paid,
           refundable: data?.object?.refundable,
        }, {
           where: {uuid: data?.object?.id}
       })
       .then(res => {
           result(res)
           console.log(res)
       })
    

   }
}


export default new PaymentService();