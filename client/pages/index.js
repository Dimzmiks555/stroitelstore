import Header from '../components/Header';
import styles from './index.module.css';
import Banner from "../components/Banner";
import Catalog from "../components/Catalog";
import CatalogStore from '../components/CatalogStore';
import { observer } from 'mobx-react';

const Index = observer(() => {
  return (
    <>
    <div className={styles.page}>
      <Catalog />
      <Header />
      <Banner />
    </div>
    </>
  )

});
export default Index