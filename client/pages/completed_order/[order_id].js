import Header from '../../components/Header/Header';
import globalStyles from '../index.module.css';

import styles from './completed_order.module.css';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import { useRouter } from "next/router";
import Order_IdStore from './order_idStore'
import Footer from '../../components/Footer/Footer';
import { useEffect } from 'react';

 const Completed_Order = observer(() => {


  const router = useRouter();

  let {order_id} = router.query
  
  if (Order_IdStore.data[0] == undefined) {
    Order_IdStore.getData()
  }
   

  return (
    <>
    <Head>
      <title>Ваш заказ успешно создан!</title>
    </Head>

    <Catalog />
    <Header />
    <div className={globalStyles.page}>
      <div className={styles.completed_order_blocks}>
        <div className={styles.completed_order_block}>
          <h1>
            Ваш заказ № {order_id}  успешно создан
          </h1>
          
          <hr></hr>
          <h2>Уважаемый {Order_IdStore.data[0]?.billing?.last_name} {Order_IdStore.data[0]?.billing?.first_name}!</h2>
          <p>В ближайшее время с вами свяжется менеджер для подтверждения заказа.</p>
          <h2>Детали заказа</h2>
          <ul>
            <li>Номер телефона: {Order_IdStore.data[0]?.billing?.phone}</li>
            <li>Электронная почта: {Order_IdStore.data[0]?.billing?.email}</li>
            <li>Способ выдачи: {Order_IdStore.data[0]?.billing?.address_1[0] == undefined ? 'Самовывоз' : 'Доставка' }</li>
            <li>Адрес: {Order_IdStore.data[0]?.billing?.address_1[0] == undefined ? 'ул. Коммунистическая д.25' : Order_IdStore.data[0]?.billing?.address_1 }</li>
          </ul>
          <button>
              Вернуться к покупкам
          </button>
        </div>
        <div className={styles.completed_order_block}> 
            <table border="1">
              <thead>
                  <tr>
                      <td>
                        ID
                      </td>
                      <td>
                        Наименование
                      </td>
                      <td>
                        Цена
                      </td>
                      <td>
                        Количество
                      </td>
                      <td>
                        Итого
                      </td>
                  </tr>
              </thead>
              <tbody>
              {Order_IdStore.data[0]?.line_items.map(item => (
                  <tr>
                      <td>
                        {item.product_id}
                      </td>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.price} 
                      </td>
                      <td>
                        {item.quantity}
                      </td>
                      <td>
                        {item.total} 
                      </td>
                  </tr>
            ))}
              </tbody>
              
            </table>

        </div>
     </div>
    </div>
    <Footer></Footer>
    </>
  )

});

export default Completed_Order;