import Header from '../components/Header/Header';
import styles from './index.module.css';
import Banner from "../components/Banner/Banner";
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import NewGoods from '../components/NewGoods';
import Offers from '../components/Offers/Offers';
import Footer from '../components/Footer/Footer';
import PopularCats from '../components/PopularCats/PopularCats';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Hits from '../components/Hits/Hits';


const Index = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Интернет-магазин строительных материалов</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <Banner />
      <PopularCats>
      </PopularCats>
      <Hits/>
      <NewGoods />
      <Offers />
    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index