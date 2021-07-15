import styles from './Login.module.css';
export default function Login () {  


    return (
        <div className={styles.login}>
            <div className={styles.sign_up}>
                <h2>Регистрация</h2>
                <input className={styles.login__input}></input>
                <input className={styles.login__input}></input>
                <button className={styles.login__button}>Далее</button>
            </div>
            <div className={styles.sign_in}>
                <h2>Вход</h2>
                <input className={styles.login__input}></input>
                <input className={styles.login__input}></input>
                <button className={styles.login__button}>Вход</button>
            </div>
        </div>
    )
}
