import styles from './Login.module.css';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from 'react';
import LoginStore from './LoginStore';
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
        } else if (json.code == '[jwt_auth] invalid_email') {
            setMessage('Такого пользователя не существует')
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
    async function handleRegistrate() {

        console.log(LoginStore.registrationData)

        let data = {
            username: LoginStore.registrationData.email,
            password: LoginStore.registrationData.password,
            email: LoginStore.registrationData.email,
            first_name: LoginStore.registrationData.first_name,
            last_name: LoginStore.registrationData.last_name,
            shipping: {
                first_name: LoginStore.registrationData.first_name,
                last_name: LoginStore.registrationData.last_name,
            },
            billing: {
                first_name: LoginStore.registrationData.first_name,
                last_name: LoginStore.registrationData.last_name,
                phone: LoginStore.registrationData.phone,
                email: LoginStore.registrationData.email
            }

        }

        const api = new WooCommerceRestApi({
            url: "https://admin.stroitelstore.ru/",
            consumerKey: "ck_9674d22e8a216dfff0369bc9aa3680f685ebda25",
            consumerSecret: "cs_96cbffa422eef1b5620be5a553b8065937e91b76",
            version: "wc/v3",
            queryStringAuth: true,
              axiosConfig: {
                headers: {'Content-Type': 'application/json'},
            }   
            });
        await api.post('customers', data)
            .then( response => {
                    console.log(response.data);
                }
            ).catch(err => {
                console.log(err, err.response?.data)
                console.log('fuck')
            })
        
    }
    
    function handleChange(id, value) {
        LoginStore.setData(id, value)
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
                        <h2>Основная информация</h2>
                        <div className={styles.main__inputs}>
                            <div>
                                <label for="first_name">Имя</label>
                                <input id="first_name" className={styles.login__input} onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Имя"></input>
                            </div>
                            <div>
                                <label for="last_name">Фамилия</label>
                                <input id="last_name" className={styles.login__input} onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Фамилия"></input>
                            </div>
                            <div>
                                <label for="email">E-mail</label>
                                <input id="email" className={styles.login__input} onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="E-mail"></input>
                            </div>
                            <div>
                                <label for="password">Пароль</label>
                                <input id="password" className={styles.login__input} type="password" onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Пароль"></input>
                            </div>
                            <div>
                                <label for="phone">Номер телефона</label>
                                <input id="phone" className={styles.login__input} onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Номер телефона"></input>
                            </div>
                        </div>
                        {

                        LoginStore.registrationData.email != '' &&
                        LoginStore.registrationData.first_name != '' &&
                        LoginStore.registrationData.last_name != '' &&
                        LoginStore.registrationData.phone != '' &&
                        LoginStore.registrationData.password != '' ? (
                            <button className={styles.login__button} onClick={handleRegistrate}>Зарегистрироваться</button>
                        ) : (
                            <button className={styles.login__button_disabled} disabled >Зарегистрироваться</button>
                        )
                        }
                    </div>
                )}
        </div>
    )
}
}