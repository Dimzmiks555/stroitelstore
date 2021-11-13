import Header from '../components/Header/Header';
import styles from './index.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Busket from '../components/Busket/Busket';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';

const Index = observer(() => {
  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Корзина | Интернет-магазин строительных материалов в городе Лиски</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
      <script type="text/javascript" src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <Busket>
        
      </Busket>
    </div>
    <Footer></Footer>
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index