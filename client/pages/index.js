import Header from '../components/Header/Header';
import styles from './index.module.css';
import Banner from "../components/Banner/Banner";
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import NewGoods from '../components/NewGoods';
import Offers from '../components/Offers/Offers';
import Footer from '../components/Footer/Footer';

const Index = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Интернет-магазин строительных материалов</title>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <Banner />
      <div>
        <h2>
            Популярные категории
        </h2>
      </div>
      <NewGoods />
      <Offers />
    </div>
    <Footer />
    </>
  )

});
export default Index