import Header from '../../../components/Header';
import styles from '../../index.module.css';
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router'
import CatalogStore from '../../../components/CatalogStore';

export default function Category() {
    const router = useRouter();
    const { index, category } = router.query;
    return (
        <div className={styles.page}>
            <Catalog />
            <Header />
            <div>
                {CatalogStore.props.categories.map((cat) => {
                    cat.subcats.map((subcat) => {
                        subcat.route == category ? (<h1>{subcat.name}</h1>) : (<h2>nn</h2>)
                    })
                })}
            </div>
        </div>
    )
}
