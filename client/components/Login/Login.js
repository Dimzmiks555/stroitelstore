import styles from './Login.module.css';
export default function Login () {  


    return (
        <div className={styles.login}>
            <div className={styles.info}>
                <img src='/login/home_repair.jpg' className={styles.image}></img>
            </div>
            <div className={styles.sign_in}>
                <h1>Добро пожаловать!</h1>
                <h2>Вход | Регистрация</h2>
                <input className={styles.login__input}></input>
                <input className={styles.login__input}></input>
                <button className={styles.login__button}>Вход</button>
            </div>
        </div>
    )
}
