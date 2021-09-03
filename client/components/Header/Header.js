import styles from './Header.module.css';
import CatalogStore from "../CatalogStore";
import Search from '../Search/Search'
import {observer} from "mobx-react";
import Link from 'next/link';
import BusketStore from '../Busket/BusketStore';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import HeaderStore from './HeaderStore';
import { useEffect } from 'react';
import decode from 'jwt-decode'
import HOST from '../../HOST';
const Header = observer(() => {





    let busketPositions = []

    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            busketPositions = JSON.parse(localStorage.getItem('positions')) || []
            if (BusketStore.order.products[0] == undefined && busketPositions[0] != undefined) {
                BusketStore.initialSet(busketPositions) 
            }
            
            
        }
    }, [BusketStore.order.products[0]])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            
            
            if (localStorage.getItem('token')) {
                let token = localStorage.getItem('token')
                
                console.log(token)

                fetch(`http://${HOST.host}/api/auth`,{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then(res => res.json())
                .then(json => {

                    if (json.token) {
                        HeaderStore.setAuth(true)
                        HeaderStore.setUserData(decode(json.token))
                        
                    }

                })
                
            }
        }
    }, [HeaderStore.userData.email])    


    async function getData(username){
        console.log(localStorage.getItem('email'))
      

            
    }



    function handleClickLogo(e) {
        CatalogStore.HideCatalog()
    };

    function handleClick() {
        CatalogStore.AppendCatalog()
    }
    return (
        <>
        <div className={styles.menu}>
            <ul>
                <li>
                    <a>О магазине</a>
                </li>
                <li>
                    <a>Доставка и оплата</a>
                </li>
                <li>
                    <a>Сотрудничество</a>
                </li>
                <li>
                    <Link href='/contacts'>
                    <a>Контакты</a>
                    </Link>
                </li>
            </ul>
            
            <div className={styles.underheader}>
                <a className={styles.underheader_location} href="https://yandex.ru/maps/10678/lisky/house/kommunisticheskaya_ulitsa_25/Z0AYcwdjS0wPQFtqfXV5dX5jZg==/?ll=39.503298%2C50.984202&utm_source=main_stripe_big&z=16.56">г. Лиски, ул. Коммунистическая, д. 25</a>

            </div>
            <div className={styles.underheader_mail}>stroitel.office@gmail.com</div>
            
            <div className={styles.underheader_phone}>+7 (900) 300-13-12</div>
        </div>
        <div className={styles.header}>
            <div className={styles.logo}  onClick={e => {handleClickLogo(e)}}>
                <Link href="/"  onClick={e => {handleClickLogo(e)}}>
                    <a  onClick={e => {handleClickLogo(e)}}><img src="/LOGO.svg"  onClick={e => {handleClickLogo(e)}}/></a>
                </Link>
            </div>
            <button className={styles.catalog__button} onClick={handleClick}>
                <img src="/header/catalog.svg" /> Каталог
            </button>
            <Search />

            <div className={styles.userblock}>
                <Link href="/busket">
                    <a href="#" className={styles.cart}>
                        <div className={styles.cart__icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="512"
                                height="512"
                                viewBox="0 0 511.728 511.728"
                                >
                                <path d="M147.925 379.116c-22.357-1.142-21.936-32.588-.001-33.68 62.135.216 226.021.058 290.132.103 17.535 0 32.537-11.933 36.481-29.017l36.404-157.641c2.085-9.026-.019-18.368-5.771-25.629s-14.363-11.484-23.626-11.484c-25.791 0-244.716-.991-356.849-1.438L106.92 54.377c-4.267-15.761-18.65-26.768-34.978-26.768H15c-8.284 0-15 6.716-15 15s6.716 15 15 15h56.942a6.246 6.246 0 016.017 4.592l68.265 253.276c-12.003.436-23.183 5.318-31.661 13.92-8.908 9.04-13.692 21.006-13.471 33.695.442 25.377 21.451 46.023 46.833 46.023h21.872a52.18 52.18 0 00-5.076 22.501c0 28.95 23.552 52.502 52.502 52.502s52.502-23.552 52.502-52.502a52.177 52.177 0 00-5.077-22.501h94.716a52.185 52.185 0 00-5.073 22.493c0 28.95 23.553 52.502 52.502 52.502 28.95 0 52.503-23.553 52.503-52.502a52.174 52.174 0 00-5.464-23.285c5.936-1.999 10.216-7.598 10.216-14.207 0-8.284-6.716-15-15-15zm91.799 52.501c0 12.408-10.094 22.502-22.502 22.502s-22.502-10.094-22.502-22.502c0-12.401 10.084-22.491 22.483-22.501h.038c12.399.01 22.483 10.1 22.483 22.501zm167.07 22.494c-12.407 0-22.502-10.095-22.502-22.502 0-12.285 9.898-22.296 22.137-22.493h.731c12.24.197 22.138 10.208 22.138 22.493-.001 12.407-10.096 22.502-22.504 22.502zm74.86-302.233c.089.112.076.165.057.251l-15.339 66.425H414.43l8.845-67.023 58.149.234c.089.002.142.002.23.113zm-154.645 163.66v-66.984h53.202l-8.84 66.984zm-74.382 0l-8.912-66.984h53.294v66.984zm-69.053 0h-.047c-3.656-.001-6.877-2.467-7.828-5.98l-16.442-61.004h54.193l8.912 66.984zm56.149-96.983l-9.021-67.799 66.306.267v67.532zm87.286 0v-67.411l66.022.266-8.861 67.145zm-126.588-67.922l9.037 67.921h-58.287l-18.38-68.194zm237.635 164.905H401.63l8.84-66.984h48.973l-14.137 61.217a7.406 7.406 0 01-7.25 5.767z"></path>
                            </svg>
                            {BusketStore.order.products.length ? (<div className={styles.cart_amount}>
                                {BusketStore.order.products.length}
                            </div>) : null}
                        </div>
                        <p>Корзина</p>
                    </a>
                </Link>
                {HeaderStore.is_Auth ? (
                    <Link href="/cabinet">
                        <div className={styles.user}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="512pt"
                                height="512pt"
                                viewBox="0 0 512 512"
                                >
                                <path d="M471.387 325.012c-16.969-14.91-37.547-27.793-61.168-38.29-10.098-4.484-21.914.063-26.399 10.157-4.484 10.094.063 21.91 10.157 26.398 19.918 8.852 37.082 19.543 51.007 31.782C462.152 370.145 472 391.989 472 415v37c0 11.027-8.973 20-20 20H60c-11.027 0-20-8.973-20-20v-37c0-23.012 9.848-44.855 27.016-59.941C87.223 337.3 146.098 296 256 296c81.605 0 148-66.395 148-148S337.605 0 256 0 108 66.395 108 148c0 47.707 22.695 90.207 57.852 117.29-64.329 14.14-104.344 41.358-125.239 59.722C14.805 347.687 0 380.484 0 415v37c0 33.086 26.914 60 60 60h392c33.086 0 60-26.914 60-60v-37c0-34.516-14.805-67.313-40.613-89.988zM148 148c0-59.55 48.45-108 108-108s108 48.45 108 108-48.45 108-108 108-108-48.45-108-108zm0 0"></path>
                            </svg>
                            <p>{HeaderStore.userData.name} <br></br> {HeaderStore.userData.surname}</p>
                        </div>
                </Link>
                ) : (
                    <Link href="/login">
                        <div className={styles.user}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="512pt"
                                height="512pt"
                                viewBox="0 0 512 512"
                                >
                                <path d="M471.387 325.012c-16.969-14.91-37.547-27.793-61.168-38.29-10.098-4.484-21.914.063-26.399 10.157-4.484 10.094.063 21.91 10.157 26.398 19.918 8.852 37.082 19.543 51.007 31.782C462.152 370.145 472 391.989 472 415v37c0 11.027-8.973 20-20 20H60c-11.027 0-20-8.973-20-20v-37c0-23.012 9.848-44.855 27.016-59.941C87.223 337.3 146.098 296 256 296c81.605 0 148-66.395 148-148S337.605 0 256 0 108 66.395 108 148c0 47.707 22.695 90.207 57.852 117.29-64.329 14.14-104.344 41.358-125.239 59.722C14.805 347.687 0 380.484 0 415v37c0 33.086 26.914 60 60 60h392c33.086 0 60-26.914 60-60v-37c0-34.516-14.805-67.313-40.613-89.988zM148 148c0-59.55 48.45-108 108-108s108 48.45 108 108-48.45 108-108 108-108-48.45-108-108zm0 0"></path>
                            </svg>
                            <p>Войти</p>
                        </div>
                    </Link>
                )}
                
            </div>
        </div>
        </>
    )
})

export default Header