import styles from './NewGoods.module.css';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
export default function NewGoods () {

    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData(){
          const api = new WooCommerceRestApi({
              url: "http://admin.stroitelstore.ru/",
              consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
              consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
              version: "wc/v3"
              });
          await api.get("products", {
                  per_page: 8,
                  stock_status: 'instock'// 18 products per page
              })
              .then( result => {
                      let arr = [];
                      result.data.forEach(item => {
                          arr.push(+item.price)
                      });
                      setData(result.data)
                  }
              )
  
              
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
                                <div className={styles.good_img}>
                                    <img src={item?.images[0]?.src}></img>
                                </div>
                                <div className={styles.good_title}>
                                    {item.name}
                                </div>
                            </div>
                            <div>
                                <div className={styles.good_price}>
                                    {item.price} ₽ / шт.
                                </div>
                                <a className={styles.to_cart}>
                                    Подробнее
                                </a>
                            </div>
                        </div>
                    
                    ))}
                </div>
                
            </div>
            
            <div className={styles.newgoods__control_left} onClick={e => {handleLeftScroll(e)}}>
                &lArr;
            </div>
            <div className={styles.newgoods__control_right} onClick={e => {handleRightScroll(e)}}>
                &rArr;
            </div>
            
            
        </div>
    )
}
