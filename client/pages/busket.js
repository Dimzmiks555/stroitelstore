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
      <title>Корзина</title>
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