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
