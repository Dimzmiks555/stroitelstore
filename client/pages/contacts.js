import Header from '../components/Header/Header';
import Mainstyles from './index.module.css';
import styles from './contacts.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Footer from '../components/Footer/Footer';


const Index = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Интернет-магазин строительных материалов</title>
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
                    Номер телефона
                </h2>
                <h3>
                    +7 (953) 119-91-20
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
                <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abe9cfc9d9db30544ec97bc0f556f7a7bd9f325e507188d21967a1eea90b01017&amp;width=100%25&amp;height=611&amp;lang=ru_RU&amp;scroll=true"></script>
            </div>

        </div>

    </div>
    <Footer />
    </>
  )

});
export default Index