import Header from '../components/Header/Header';
import styles from './index.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Cabinet from '../components/Cabinet/Cabinet';
import Footer from '../components/Footer/Footer';

const CabinetPage = observer(() => {
  return (
    <>
    <Head>
      <title>Корзина</title>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <Cabinet>
        
      </Cabinet>
    </div>
    <Footer></Footer>
    </>
  )

});
export default CabinetPage