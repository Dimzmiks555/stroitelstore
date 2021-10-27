import styles from './Footer.module.css';
import { YMInitializer } from 'react-yandex-metrika';
import Link from 'next/link'
const Footer = () => {


    // (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    // m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    // (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    // ym(86105798, "init", {
    //         clickmap:true,
    //         trackLinks:true,
    //         accurateTrackBounce:true,
    //         webvisor:true
    // });




    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <Link href="/">
                    <a><img src="/LOGO_WHITE.svg" /></a>
                </Link>
                {/* <noscript><div><img src="https://mc.yandex.ru/watch/86105798" style="position:absolute; left:-9999px;" alt="" /></div></noscript> */}
                <YMInitializer accounts={[86105798]} options={{webvisor: true}}/>
            </div>
            <div className={styles.menu}>
                <ul>
                    <Link href="/about">
                        <li>
                            <a>О магазине</a>
                        </li>
                    </Link>
                    <Link href="/payment_and_delivery">
                    <li>
                        <a>Доставка и оплата</a>
                    </li>
                    </Link>
                    {/* <li>
                        Сотрудничество
                    </li> */}
                    <Link href='/contacts'>
                    <li>
                        <a>Контакты</a>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className={styles.contact_info}>
                <div>
                    <h2>
                        +7 (919) 242-13-12
                    </h2>
                    <h3>г. Лиски, ул. Коммунистическая, д. 25</h3>
                    <h3>
                    stroitel.office@gmail.com

                    </h3>
                    <img src='/footer/sber.svg'></img>
                    <img src='/footer/visa.png'></img>
                </div>
            </div>
        </div>
    )
}

export default Footer