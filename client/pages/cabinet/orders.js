import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './orders.module.sass';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import HeaderStore from '../../components/Header/HeaderStore';
import MobileMenu from '../../components/MobileMenu/MobileMenu';

import OrdersItem from '../../components/OrdersItem';
import HOST from '../../HOST';

const Index = observer(() => {

    const [data, setData] = useState([])


    useEffect(() => {

        fetch(`${HOST.host}/api/orders?user_id=${HeaderStore?.userData?.id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })

    }, [data.count])


    
  return (
    <>
    <Head>
      <title>Строитель - Мои заказы</title>
    </Head>
    
    <Catalog />
    <Header />
    <div className={Mainstyles.page}>
        <div className={styles.orders}>
        <h1>Мои заказы</h1>
            {data?.rows?.map((order) => (
                
                <OrdersItem key={order?.id} data={order}/>

            ))}
        </div>
        
        {/* <OrdersItem data={data?.rows?.[0]}/> */}
    </div>
    <Footer></Footer>
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index