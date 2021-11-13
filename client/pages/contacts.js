import Header from '../components/Header/Header';
import Mainstyles from './index.module.css';
import styles from './contacts.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';


const Index = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Контакты | Интернет-магазин строительных материалов в городе Лиски</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={Mainstyles.page}>

        

        <div className={styles.contacts__block}>

            <div>
                <h1>
                    Контакты
                </h1>
                <h2>
                    Индивидуальный предприниматель
                </h2>
                <h3>
                    Аветикян Липарит Ашотович
                </h3>
                <h2>
                    ОГРН
                </h2>
                <h3>
                    318366800109540
                </h3>
                <h2>
                    ИНН
                </h2>
                <h3>
                    365233175954
                </h3>
                <h2>
                    Номер телефона
                </h2>
                <h3>
                    +7 (919) 242-13-12
                </h3>
                <h2>
                    Электронная почта
                </h2>
                <h3> 
                    stroitelstore@mail.ru
                </h3>
                <h2>
                    График работы
                </h2>
                <h2>
                    8:00 - 18:00
                </h2>
                <h3>
                    Без перерывов и выходных
                </h3>
            </div>
            <div className={styles.map}>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abe9cfc9d9db30544ec97bc0f556f7a7bd9f325e507188d21967a1eea90b01017&amp;source=constructor" width="100%" height="630" frameborder="0"></iframe>
            </div>

        </div>

    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index