import Header from '../../components/Header/Header';
import styles from '../index.module.css';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import { useRouter } from "next/router";
import Footer from '../../components/Footer/Footer';


export default function Completed_Order() {

  return (
    <>
    <Head>
      <title>Ваш заказ успешно создан!</title>
    </Head>

    <Catalog />
    <Header />
    <div className={styles.page}>
      <h1>
        Ваш заказ №   успешно создан!
      </h1>
    </div>
    <Footer></Footer>
    </>
  )

};