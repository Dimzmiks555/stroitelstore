import Header from '../components/Header/Header';
import Mainstyles from './index.module.css';
import styles from './contacts.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';


const About = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - О магазине</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={Mainstyles.page}>

        

        <div className={styles.contacts__block}>

            <div>
                <h1>
                    О магазине
                </h1>
                <h3>
                    
                </h3>
                <h2>
                    
                </h2>
                
            </div>

        </div>

    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default About