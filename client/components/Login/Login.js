import styles from './Login.module.css';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from 'react';
import LoginStore from './LoginStore';
import { observer } from 'mobx-react';
import HOST from '../../HOST';
const Login = observer(() => {  

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
            phone: username,
            password: password
        }

        fetch(`${HOST.host}/api/login`,{
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
        console.log(json.token)
        if (json.token.message) {
            setMessage(json.token.message)
            setLoading(false)
        }
        if (!json.token.message && json.token) {
            localStorage.setItem('token', json.token)
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
            phone: LoginStore.registrationData.phone,
            password: LoginStore.registrationData.password,
            surname: LoginStore.registrationData.name,
            name: LoginStore.registrationData.surname

        }

    
        fetch(`${HOST.host}/api/registration`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            if (!json.token.message && json.token) {
                localStorage.setItem('token', json.token)
                setLoading(false)
                window.location.href = '/'
            }
        })
    }
    
    function handleChange(id, value) {
        LoginStore.setData(id, value)
        console.log(LoginStore.registrationData)
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
                    <input className={styles.login__input} placeholder="Номер телефона" onChange={e => {handleUserName(e)}}></input>
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
                                <label for="phone">Номер телефона (начиная с 8)</label>
                                <input id="phone" type='number' className={styles.login__input} onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Номер телефона "></input>
                            </div>
                            <div>
                                <label for="password">Пароль (минимум 8 символов)</label>
                                <input id="password" className={styles.login__input} type="password" onChange={e => {handleChange(e.target.id, e.target.value)}} placeholder="Пароль"></input>
                            </div>
                        </div>
                        {

                        LoginStore.registrationData.name != '' &&
                        LoginStore.registrationData.surname != '' &&
                        LoginStore.registrationData.phone != '' &&
                        LoginStore.registrationData.phone.length == 11 &&
                        LoginStore.registrationData.phone[0] == '8' &&
                        LoginStore.registrationData.password.length >= 8 &&
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
}) 

export default Login