import Header from '../../components/Header/Header';
import globalStyles from '../index.module.css';

import styles from './completed_order.module.css';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import { useRouter } from "next/router";
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import HeaderStore from '../../components/Header/HeaderStore';
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import HOST from '../../HOST';
import Link from 'next/link'
 const Completed_Order = observer(() => {


  const router = useRouter();
  const [data, setData] = useState([])


  const {order_id} = router.query
  
  useEffect(() => {

    fetch(`${HOST.host}/api/orders/${order_id}`)
    .then(res => res.json())
    .then(json => {
      setData(json)
      console.log(json)
    })

  }, [order_id])


  
   

  return (
    <>
    <Head>
      <title>Строитель - Ваш заказ успешно создан!</title>
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
          <h2>Уважаемый {HeaderStore.userData.surname} {HeaderStore.userData.name}!</h2>
          <p>В ближайшее время с вами свяжется менеджер для подтверждения заказа.</p>
          <h2>Детали заказа</h2>
          <ul>
            <li>Номер телефона: {HeaderStore.userData.phone}</li>
            <li>Способ выдачи: {data?.type == 'shop' ? 'Самовывоз' : 'Доставка' }</li>
            <li>Адрес: {data?.address}</li>
          </ul>
          <Link href="/">
              <button>
                  Вернуться к покупкам
              </button>
          </Link>
        </div>
        <div className={styles.completed_order_block}> 
            <div>
              <h1>Итого {data?.total}</h1>
            </div>
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
              {data?.order_products?.map(item => (
                  <tr>
                      <td>
                        {item.id}
                      </td>
                      <td>
                        {item?.good?.title}
                      </td>
                      <td>
                        {item.price} 
                      </td>
                      <td>
                        {item.count}
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
    <MobileMenu></MobileMenu>
    </>
  )

});

export default Completed_Order;