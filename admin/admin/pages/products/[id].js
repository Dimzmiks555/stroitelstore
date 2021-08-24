import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'

 export default function Products() {

    const router = useRouter();


    const [data, setData] = useState([])

    function fetchData(id) {
        fetch(`http://localhost/api/products/${id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }

    useEffect(() => { 
        fetchData(router.query.id)
    }, [ router.query.id])


     return (
         <Layout title="Продукт">
             
            <div className={styles.product}>
                <div className={styles.main_info}>
                    {
                        data[0] ? (
                            <div>
                                <h1>{data[0]?.title}</h1>
                                <h3>{data[0]['prices_and_count.amount'] == 0 ? 'Нет в наличии' : ' В наличии '}</h3>
                                <h2>Группа: {data[0]['group.title']}</h2>
                                <h3>Артикул: {data[0]['prices_and_count.sku']}</h3>
                                <h3>Цена: {data[0]['prices_and_count.price']}</h3>
                                <h3>Количество: {data[0]['prices_and_count.amount']} {data[0]['prices_and_count.unit']}</h3>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles.additional_info}>
                    <h2>Описание</h2>
                </div>
            </div>


         </Layout>
     )
 }