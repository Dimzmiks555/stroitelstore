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
      <title>Вход</title>
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