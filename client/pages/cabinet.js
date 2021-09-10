import Header from '../components/Header/Header';
import styles from './index.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Cabinet from '../components/Cabinet/Cabinet';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';

const CabinetPage = observer(() => {
  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Личный кабинет</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <Cabinet>
        
      </Cabinet>
    </div>
    <Footer></Footer>
    <MobileMenu></MobileMenu>
    </>
  )

});
export default CabinetPage