import Header from '../components/Header';
import styles from './index.module.css';
import Banner from "../components/Banner";
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import NewGoods from '../components/NewGoods';
import Footer from '../components/Footer';

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
      <NewGoods />
    </div>
    <Footer />
    </>
  )

});
export default Index