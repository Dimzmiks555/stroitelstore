import styles from './Cabinet.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react';
import HeaderStore from '../Header/HeaderStore';
import CabinetStore from './CabinetStore';
import BusketStore from '../Busket/BusketStore';
import { useRouter } from 'next/router';
import HOST from '../../HOST';


const Cabinet = observer(() => {

    const [deliveries, setDeliveries] = useState([])

    useEffect(() => {
        CabinetStore.getOrders()
        console.log(CabinetStore.orders)

        if (HeaderStore?.is_Auth) {
            fetch(`${HOST.host}/api/deliveries?user_id=${HeaderStore.userData?.id}`)
            .then(res => res.json())
            .then(json => {
                setDeliveries(json)
                console.log('del', json)
            })
        } 

    }, [CabinetStore.orders[0]?.id, HeaderStore.is_Auth])



    if (typeof window != 'undefined') {

    }



    function handleCashback(e) {
        let block = e.currentTarget;
        block.style.position = 'absolute';
        block.style.width = '80%';
        block.style.height = `${block.scrollHeight * 2}`
    }
    function handleLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/'
    }
    function handleClientBlock(e) {
        let h2 = e.currentTarget.querySelector('h2')
        let block = e.currentTarget;
        h2.style.fontSize = '32px'
        block.style.position = 'absolute';
        block.style.width = '80%';
        block.style.height = '80vh'
    }
    return (
        <>
        <div className={styles.cabinet}>
            <div className={styles.cabinet__header}>
                <h1>Личный кабинет</h1>
                <button onClick={handleLogOut}>Выйти</button>
            </div>
            <div className={styles.blocks}>
                <Link href="/cabinet/orders">
                    <div className={styles.clientData}>
                        <div className={styles.clientData__image}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            enableBackground="new 0 0 512 512"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                            >
                            <path d="M458.737 422.218l-22.865-288.116c-1.425-18.562-17.123-33.103-35.739-33.103H354.97v-2.03C354.97 44.397 310.573 0 256.001 0s-98.969 44.397-98.969 98.969v2.03H111.87c-18.617 0-34.316 14.54-35.736 33.064L53.262 422.257c-1.77 23.075 6.235 46.048 21.961 63.026C90.949 502.261 113.242 512 136.385 512h239.231c23.142 0 45.436-9.738 61.163-26.717 15.726-16.979 23.73-39.951 21.958-63.065zM187.022 98.969c0-38.035 30.945-68.979 68.979-68.979s68.979 30.945 68.979 68.979v2.03H187.022v-2.03zm227.754 365.936c-10.218 11.03-24.124 17.105-39.16 17.105h-239.23c-15.036 0-28.942-6.075-39.16-17.105-10.217-11.031-15.211-25.363-14.063-40.315l22.87-288.195c.232-3.032 2.796-5.406 5.837-5.406h45.162v36.935c0 8.281 6.714 14.995 14.995 14.995 8.281 0 14.995-6.714 14.995-14.995v-36.935H324.98v36.935c0 8.281 6.714 14.995 14.995 14.995s14.995-6.714 14.995-14.995v-36.935h45.163c3.04 0 5.604 2.375 5.84 5.446l22.865 288.115c1.15 14.992-3.845 29.323-14.062 40.355z"></path>
                            <path d="M323.556 254.285c-5.854-5.856-15.349-5.856-21.204 0l-66.956 66.956-25.746-25.746c-5.855-5.856-15.35-5.856-21.206 0s-5.856 15.35 0 21.206l36.349 36.349c2.928 2.928 6.766 4.393 10.602 4.393s7.675-1.464 10.602-4.393l77.558-77.558c5.857-5.857 5.857-15.351.001-21.207z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2>Заказы</h2>
                        </div>
                    </div>
                </Link>
                <div className={styles.userData}>
                    <div className={styles.clientData__image}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="512pt"
                            height="512pt"
                            viewBox="0 0 512 512"
                            >
                            <path d="M471.387 325.012c-16.969-14.91-37.547-27.793-61.168-38.29-10.098-4.484-21.914.063-26.399 10.157-4.484 10.094.063 21.91 10.157 26.398 19.918 8.852 37.082 19.543 51.007 31.782C462.152 370.145 472 391.989 472 415v37c0 11.027-8.973 20-20 20H60c-11.027 0-20-8.973-20-20v-37c0-23.012 9.848-44.855 27.016-59.941C87.223 337.3 146.098 296 256 296c81.605 0 148-66.395 148-148S337.605 0 256 0 108 66.395 108 148c0 47.707 22.695 90.207 57.852 117.29-64.329 14.14-104.344 41.358-125.239 59.722C14.805 347.687 0 380.484 0 415v37c0 33.086 26.914 60 60 60h392c33.086 0 60-26.914 60-60v-37c0-34.516-14.805-67.313-40.613-89.988zM148 148c0-59.55 48.45-108 108-108s108 48.45 108 108-48.45 108-108 108-108-48.45-108-108zm0 0"></path>
                        </svg>
                    </div>
                    <div>
                        <h2>{HeaderStore.userData?.name} {HeaderStore.userData[0]?.last_name}</h2>
                        <p>E-mail: {HeaderStore.userData?.email}</p>
                        <p>Телефон: {HeaderStore.userData?.phone}</p>
                    </div>
                </div>
                <div className={styles.receipts}>
                    <div className={styles.clientData__image}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            enableBackground="new 0 0 512 512"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                            >
                            <path d="M119.467 337.067c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2s51.2-22.963 51.2-51.2c0-28.237-22.964-51.2-51.2-51.2zm0 85.333c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133s34.133 15.309 34.133 34.133c0 18.824-15.309 34.133-34.133 34.133zM409.6 337.067c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2 28.237 0 51.2-22.963 51.2-51.2 0-28.237-22.963-51.2-51.2-51.2zm0 85.333c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133 18.825 0 34.133 15.309 34.133 34.133 0 18.824-15.308 34.133-34.133 34.133z"></path>
                            <path d="M510.643 289.784l-76.8-119.467a8.535 8.535 0 00-7.177-3.917H332.8a8.53 8.53 0 00-8.533 8.533v213.333a8.525 8.525 0 008.533 8.533h34.133v-17.067h-25.6V183.467h80.674l72.926 113.442v82.825h-42.667V396.8h51.2a8.525 8.525 0 008.533-8.533V294.4a8.51 8.51 0 00-1.356-4.616z"></path>
                            <path d="M375.467 277.333V217.6h68.267v-17.067h-76.8a8.53 8.53 0 00-8.533 8.533v76.8a8.525 8.525 0 008.533 8.533h128v-17.067H375.467zM332.8 106.667H8.533A8.536 8.536 0 000 115.2v273.067a8.53 8.53 0 008.533 8.533H76.8v-17.067H17.067v-256h307.2v256H162.133V396.8H332.8a8.525 8.525 0 008.533-8.533V115.2a8.53 8.53 0 00-8.533-8.533z"></path>
                            <path d="M8.533 345.6H59.733000000000004V362.66700000000003H8.533z"></path>
                            <path d="M179.2 345.6H324.267V362.66700000000003H179.2z"></path>
                            <path d="M469.333 345.6H503.466V362.66700000000003H469.333z"></path>
                            <path d="M34.133 140.8H332.79999999999995V157.86700000000002H34.133z"></path>
                            <path d="M110.933 379.733H128V396.8H110.933z"></path>
                            <path d="M401.067 379.733H418.134V396.8H401.067z"></path>
                            <path d="M34.133 72.533H153.6V89.6H34.133z"></path>
                            <path d="M0 72.533H17.067V89.6H0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h2>Адрес доставки</h2>
                        <div>
                            <p>
                                {
                                    deliveries.length >= 1 ? (`г. ${deliveries?.[0]?.city}, ул. ${deliveries?.[0]?.street}, д. ${deliveries?.[0]?.house}, кв. ${deliveries?.[0]?.room}`) : (`не указан`)   
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}) 
export default Cabinet