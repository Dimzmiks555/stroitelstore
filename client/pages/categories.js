import Header from '../components/Header/Header';
import styles from './index.module.css';
import Banner from "../components/Banner/Banner";
import Catalog from "../components/Catalog";
import Head from 'next/head';
import Link from 'next/link'
import { observer } from 'mobx-react';
import NewGoods from '../components/NewGoods';
import Offers from '../components/Offers/Offers';
import Footer from '../components/Footer/Footer';
import PopularCats from '../components/PopularCats/PopularCats';
import MobileMenu from '../components/MobileMenu/MobileMenu';


const CatalogPage = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Категории | Интернет-магазин строительных материалов в городе Лиски</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <div className={styles.popular}>
            <div className={styles.popular__wrapper}>
                <div>
                    <Link href='/categories/2cf30f47-3ecb-11eb-93a4-18c04d2a3938'>
                        <div className={styles.popular__block}>
                            <img src='./popular_cats/doorway.svg'> 

                            </img>
                            <p>
                                Двери, напольные покрытия
                            </p>
                        </div>
                    </Link>
                    <Link href='/categories/0fb5fdea-35ed-11eb-9395-18c04d2a3938'>    
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/bolts.svg'> 

                        </img>
                        <p>
                            Крепеж
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/3aa745cc-385b-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/caulk-gun.svg'> 

                        </img>
                        <p>
                            Клеи, герметики, пены
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/3aa745cf-385b-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/hammer.svg'> 

                        </img>
                        <p>
                           Ручной инструмент
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/2cf30f48-3ecb-11eb-93a4-18c04d2a3938'>
                        <div className={styles.popular__block}>
                            <img src='./popular_cats/handle.svg'> 

                            </img>
                            <p>
                                Дверная фурнитура
                            </p>
                        </div>
                    </Link>
                    <Link href='/categories/3aa745ce-385b-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/drill.svg'> 

                        </img>
                        <p>
                            Электроинструмент
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/3aa745d0-385b-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/disk.svg'> 

                        </img>
                        <p>
                            Расходные материалы и оснастка
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/ee3fc6c2-3854-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/paint-bucket.svg'> 

                        </img>
                        <p>
                           Краски и малярный инструмент
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/49c9eb8c-3f93-11eb-93a5-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/cement.svg'> 

                        </img>
                        <p>
                           Сухие смеси
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/3aa745d8-385b-11eb-9399-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/watering-plants.svg'> 

                        </img>
                        <p>
                           Хозяйственный инвентарь
                        </p>
                    </div>
                    </Link>
                    <Link href='/categories/53b60c08-41f1-11eb-93a8-18c04d2a3938'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/roof.svg'> 

                        </img>
                        <p>
                           Кровельные материалы и утеплители
                        </p>
                    </div>
                    </Link>
                </div>
            </div>
            
        </div>
    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default CatalogPage