import Header from '../components/Header';
import styles from './index.module.css';
import Banner from "../components/Banner";
import Catalog from "../components/Catalog";

export default function Index(){
  return (
    <>
    <div className={styles.page}>
      <Catalog />
      <Header />
      <Banner />
    </div>
    </>
  )

}
