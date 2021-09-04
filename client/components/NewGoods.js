import styles from './NewGoods.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import HOST from '../HOST';

export default function NewGoods () {

    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData(){
          
          await fetch(`http://${HOST.host}/api/products?page=1`)
          .then(result => result.json())
          .then(json => {
              json.rows.splice(0, 1)
              setData(json.rows)
              console.log(json.rows)
          });

              
      }
      
      getData();
  
  
      
  
  }, []);

    function handleRightScroll(e) {
        let newgoods = document.getElementById('newgoods');
        if (newgoods.style.transform == 'translateX(-100%)') {
            return
        } else {
            newgoods.style.transform = 'translateX(-100%)'
        }
    }
    function handleLeftScroll(e) {
        let newgoods = document.getElementById('newgoods');
        if (newgoods.style.transform == 'translateX(-100%)') {
            newgoods.style.transform = 'translateX(0%)'
        } else {
            return
        }
    }
    return (
        <div className={styles.newgoods}>
            <h2>
                Новинки
            </h2>
            <div className={styles.newgoods__wrapper} >
                <div className={styles.newgoods__items} id="newgoods">
                    {data.map(item => (
                        <div className={styles.newgoods__item}>
                            <div>
                                <Link href={`/product/${item.guid}`}>
                                    <div className={styles.good_img}>
                                        <img alt="" src={`http://${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                    </div>
                                </Link>
                                <Link href={`/product/${item.guid}`}>
                                <div className={styles.good_title}>
                                    {item.title}
                                </div>
                                </Link>
                            </div>
                            <div>
                                <div className={styles.good_price}>
                                    <p>
                                        <span>{(+item.prices_and_count.price).toLocaleString()}</span> ₽ / шт.
                                    </p>
                                </div>
                                <Link href={`/product/${item.guid}`}>
                                <a className={styles.to_cart}>
                                    В корзину
                                </a>
                                </Link>
                            </div>
                        </div>
                    
                    ))}
                </div>
                
            </div>
            
            <div className={styles.newgoods__control_left} onClick={e => {handleLeftScroll(e)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enableBackground="new 0 0 512.002 512.002"
                version="1.1"
                viewBox="0 0 512.002 512.002"
                xmlSpace="preserve"
                >
                <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
            </svg>
            </div>
            <div className={styles.newgoods__control_right} onClick={e => {handleRightScroll(e)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enableBackground="new 0 0 512.002 512.002"
                version="1.1"
                viewBox="0 0 512.002 512.002"
                xmlSpace="preserve"
                >
                <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
            </svg>
            </div>
            
            
        </div>
    )
}
