import styles from './PopularCats.module.css';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function PopularCats () {



    return (
        <div className={styles.popular}>
            <h2>
                Популярные категории
            </h2>
            <div className={styles.popular__wrapper}>
                <div>
                    <Link href='/catalog/e4288d19-b14d-11eb-943b-18c04d2a3938/1'>
                        <div className={styles.popular__block}>
                            <img src='./popular_cats/doorway.svg'> 

                            </img>
                            <p>
                                Входные двери 
                            </p>
                        </div>
                    </Link>
                    <Link href='/catalog/e4288d27-b14d-11eb-943b-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/laser-level.svg'> 

                        </img>
                        <p>
                            Лазерное оборудование
                        </p>
                    </div>
                    </Link>
                    <Link href='/catalog/1d96c33b-aef1-11eb-9438-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/caulk-gun.svg'> 

                        </img>
                        <p>
                            Клеи
                        </p>
                    </div>
                    </Link>
                    <Link href='/catalog/9727eac2-cd96-11eb-9463-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/hammer.svg'> 

                        </img>
                        <p>
                           Молотки
                        </p>
                    </div>
                    </Link>
                </div>
                <div>
                    <Link href='/catalog/e4288d53-b14d-11eb-943b-18c04d2a3938/1'>
                        <div className={styles.popular__block}>
                            <img src='./popular_cats/door (1).svg'> 

                            </img>
                            <p>
                                Межкомнатные двери 
                            </p>
                        </div>
                    </Link>
                    <Link href='/catalog/e4288d2c-b14d-11eb-943b-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/drill.svg'> 

                        </img>
                        <p>
                            Дрели
                        </p>
                    </div>
                    </Link>
                    <Link href='/catalog/3aa745d1-385b-11eb-9399-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/disk.svg'> 

                        </img>
                        <p>
                            Круги и диски 
                        </p>
                    </div>
                    </Link>
                    <Link href='/catalog/e4288d3e-b14d-11eb-943b-18c04d2a3938/1'>
                    <div className={styles.popular__block}>
                        <img src='./popular_cats/paint-bucket.svg'> 

                        </img>
                        <p>
                           Эмали ПФ-115
                        </p>
                    </div>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}
