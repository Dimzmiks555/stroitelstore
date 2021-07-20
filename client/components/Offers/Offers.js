import styles from './Offers.module.css';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function NewGoods () {

    const [data, setData] = useState([]);
    useEffect(() => {
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
          await api.get("products", {
                  per_page: 10,
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


    return (
        <div className={styles.offers}>
            <div className={styles.offers__wrapper}>
                <div className={styles.offer}>
                    <Link href="/search/текс">
                    <img src="./offers/AkG5VhRaoA0.jpg">

                    </img>
                    </Link>
                    <Link href="/search/зубр">
                    <img src="./offers/drel-zubr-standart-1.jpg">

                    </img>
                    </Link>
                </div>
                <div className={styles.offer}>
                    <Link href="/search/момент">
                    <img src="./offers/11.jpg">

                    </img>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}
