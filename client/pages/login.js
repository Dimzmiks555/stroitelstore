import Header from '../components/Header/Header';
import styles from './index.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Login from '../components/Login/Login';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';

const Index = observer(() => {
  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Вход | Интернет-магазин строительных материалов в городе Лиски</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
        <Login>

        </Login>
    </div>
    <Footer></Footer>
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index