import styles from './Busket.module.css'
import Link from 'next/link'
export default function Busket () {
    return (
        <div className={styles.busket}>
            <div className={styles.busket_info}>
                <h1>Заказ</h1>
                <div className={styles.busket_items}>
                    <div className={styles.busket_item}>
                        <Link href="/product/unis-plus">
                            <a className={styles.good_img}>
                                <div>
                                    <img src="/good/unis.jpg"></img>
                                </div>
                            </a>
                        </Link>
                        <Link href="/product/unis-plus">
                            <a className={styles.good_title}>
                                <div >
                                    Юнис Плюс
                                </div>
                            </a>
                        </Link>
                        <div className={styles.good_price}>
                            344 ₽ / шт.
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.busket_mainblock}>
                <div>
                    <h2>Итого</h2>
                </div>
            </div>
        </div>
    )
}