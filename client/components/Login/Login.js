import styles from './Login.module.css';

import { useState } from 'react';
export default function Login () {  

    const [type, setType] = useState(['login'])
    const [username, setUsername] = useState([''])
    const [password, setPassword] = useState([''])
    const [message, setMessage] = useState([''])
    const [isLoading, setLoading] = useState([false]);

    function handleUserName(e) {
        setUsername(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleLogin() {
        
        setLoading(true)
        setMessage('')
        let data = {
            username: username,
            password: password
        }

        fetch('https://admin.stroitelstore.ru/wp-json/jwt-auth/v1/token',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    )
    .then(res => {return res.json()})
    .then(json => {
        console.log(json)
        console.log(json.code)
        if (json.code == '[jwt_auth] incorrect_password') {
            setMessage('Введен неверный пароль')
            setLoading(false)
        } else if (json.code == '[jwt_auth] empty_username') {
            setMessage('Не все поля заполнены!')
            setLoading(false)
        } else if (json.code == '[jwt_auth] empty_password') {
            setMessage('Не все поля заполнены!')
            setLoading(false)
        }
        if (json.token[0]) {
            localStorage.setItem('token', json.token)
            localStorage.setItem('username', json.user_email)
            setLoading(false)
            window.location.href = '/'
        }
    })
    .catch(err => console.log(err))
            setLoading(false)
    }
    

    function handleclick(value) {
        setType(value)
    }
    if (isLoading == true) {
        return (
            <div className={styles.LoadingPanel}>
                    <img src='/spinning-circles.svg'></img>
            </div>
        )
    } else {
    return (
        <div className={styles.login}>


                {type == 'login' ? (
                    <div className={styles.info} >
                        <img src='/login/385-2-2048x1260.png' className={styles.image}></img>
                    </div>
                ) : (
                    <div className={styles.info} style={{width: '50%'}} >
                        <img src='/login/home_repair.jpg' className={styles.image}></img>
                    </div>
                )}
                {type == 'login' ? (
                    
            <div className={styles.sign_in}>
                
                    <div className={styles.tabs}>
                        <button style={type == 'login' ? {background: '#d00', color: '#fff', border: '2px solid #d00'} : null} onClick={e => {handleclick('login')}}>Вход</button>
                        <button style={type == 'registration' ? {background: '#d00', color: '#fff', border: '2px solid #d00'} : null} onClick={e => {handleclick('registration')}}>Регистрация</button>
                    </div>
                    <h1>Добро пожаловать!</h1>
                    <input className={styles.login__input} placeholder="E-mail" onChange={e => {handleUserName(e)}}></input>
                    <input className={styles.login__input} type='password' placeholder="Пароль"onChange={e => {handlePassword(e)}}></input>
                    <p>{message}</p>
                    <button className={styles.login__button} onClick={handleLogin}>Вход</button>
                    
            </div>
                ) : (
                    <div className={styles.sign_in} style={{width: '50%'}}>
                
                        <div className={styles.tabs}>
                            <button style={type == 'login' ? {background: '#d00', color: '#fff', border: '2px solid #d00'} : null} onClick={e => {handleclick('login')}}>Вход</button>
                            <button style={type == 'registration' ? {background: '#d00', color: '#fff', border: '2px solid #d00'} : null} onClick={e => {handleclick('registration')}}>Регистрация</button>
                        </div>
                        <h1>Регистрация</h1>
                        <input className={styles.login__input} placeholder="E-mail"></input>
                        <input className={styles.login__input} placeholder="Пароль"></input>
                        <input className={styles.login__input} placeholder="Номер телефона"></input>
                        <input className={styles.login__input} placeholder="Имя"></input>
                        <input className={styles.login__input} placeholder="Фамилия"></input>
                        <button className={styles.login__button}>Зарегистрироваться</button>
                    </div>
                )}
        </div>
    )
}
}