import styles from './Header.module.css';
export default function Header () {
    return (
        <div className={styles.header}>
            <div className="logo">
                Строитель
            </div>
            <button className={styles.catalog__button}>
                Каталог
            </button>
            <input className={styles.search} placeholder="Поиск">
            </input>
        </div>
    )
}