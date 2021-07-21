import styles from './Login.module.css';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from 'react';
export default function Login () {  

    const [type, setType] = useState(['login'])


    let data = {
        username: "anodaday",
        password: "yjdsqu2013"
    }


    fetch('https://admin.stroitelstore.ru/wp-json/jwt-auth/v1/token',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err))

    function handleclick(value) {
        setType(value)
    }
    async function getData(){
        const api = new WooCommerceRestApi({
            url: "https://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3",
            queryStringAuth: true,
            axiosConfig: {
              headers: {'Content-Type': 'application/json'},
              }
            });
        await api.get("customers", {
                per_page: 20,
            })
            .then( result => {
                    let arr = [];
                    console.log(JSON.parse(result.data))
                }
            )

            
    }
    
    getData();

    return (
        <div className={styles.login}>
            <div className={styles.info}>
                <img src='/login/home_repair.jpg' className={styles.image}></img>
            </div>
            <div className={styles.sign_in}>
                
                <div className={styles.tabs}>
                    <button onClick={e => {handleclick('login')}}>Вход</button>
                    <button onClick={e => {handleclick('registration')}}>Регистрация</button>
                </div>
                {type == 'login' ? (
                    <>
                    <h1>Добро пожаловать!</h1>
                    <input className={styles.login__input} placeholder="E-mail"></input>
                    <input className={styles.login__input} placeholder="Пароль"></input>
                    <button className={styles.login__button}>Вход</button>
                    </>
                ) : (
                    <>
                    <h1>Регистрация</h1>
                    <input className={styles.login__input} placeholder="E-mail"></input>
                    <input className={styles.login__input} placeholder="Пароль"></input>
                    <input className={styles.login__input} placeholder="Номер телефона"></input>
                    <input className={styles.login__input} placeholder="Имя"></input>
                    <input className={styles.login__input} placeholder="Фамилия"></input>
                    <button className={styles.login__button}>Вход</button>
                    </>
                )}
            </div>
        </div>
    )
}
