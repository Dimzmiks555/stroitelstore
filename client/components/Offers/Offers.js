import styles from './Offers.module.css';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function NewGoods () {

    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData(){
  
              
      }
      
      getData();
  
  
      
  
  }, []);


    return (
        <div className={styles.offers}>
            <div className={styles.offers__wrapper}>
                <div className={styles.offer}>
                    <Link href="/search/ЗУБР/1">
                    <img src="./offers/cae303a8-9ee2-467e-b48a-87125f96b836.png">

                    </img>
                    </Link>
                    <Link href="/search/момент/1">
                    <img src="./offers/image.jfif">

                    </img>
                    </Link>
                </div>
                <div className={styles.offer}>
                    <Link href="/search/tikurilla/1">
                    <img src="./offers/466107473_w640_h640_kraski.jpg">

                    </img>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}
