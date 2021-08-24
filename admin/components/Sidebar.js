import styles from './Sidebar.module.css'
import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>

            <div className={styles.logo}>
                <img src='/sidebar/LOGO.svg'></img>
            </div>


            <ul>
                <li>
                    <Link href="/">
                        <a>
                            Главная
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/products">
                        <a>
                            Товары
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/orders">
                        <a>
                            Заказы
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/groups">
                        <a>
                            Группы
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/attributes">
                        <a>
                            Атрибуты
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}