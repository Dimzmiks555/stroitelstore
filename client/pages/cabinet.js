import Header from '../components/Header/Header';
import styles from './index.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Cabinet from '../components/Cabinet/Cabinet';

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
    </>
  )

});
export default CabinetPage