import Header from '../../components/Header/Header';
import styles from '../index.module.css';
import Banner from "../../components/Banner/Banner";
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import Link from 'next/link'
import { observer } from 'mobx-react';
import NewGoods from '../../components/NewGoods';
import Offers from '../../components/Offers/Offers';
import Footer from '../../components/Footer/Footer';
import PopularCats from '../../components/PopularCats/PopularCats';
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import HOST from '../../HOST';
import router from 'next/router';


const GroupPage = observer(({data}) => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - Интернет-магазин строительных материалов</title>
    </Head>
    
    <Catalog />
    <Header />
    <div className={styles.page}>
      <div className={styles.popular}>
          
            <Link href={`/categories`}>
                <p className={styles.back}>
                    ← Назад
                </p>
            </Link>
            <div className={styles.popular__wrapper}>
                <div>
                    {
                        data?.rows?.map(item => (
                            <Link href={`/catalog/${item?.guid}/1`}>
                                <div className={styles.popular__block}>
                                    <p>
                                       {item?.title}
                                    </p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            
        </div>
    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default GroupPage


export async function getServerSideProps({params}) {
    const res = await fetch(`${HOST.host}/api/groups?parent_group=${params?.group}`)
    const data = await res.json()

    if (!data) {
        return {
          notFound: true,
        }
      }
    
      return {
        props: { data }, // will be passed to the page component as props
      }
}