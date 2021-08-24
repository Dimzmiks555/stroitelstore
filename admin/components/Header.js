import styles from './Header.module.css'


export default function Header({title}) {
    return (
        <div className={styles.header}>
            <h1>{title}</h1>
        </div>
    )
}