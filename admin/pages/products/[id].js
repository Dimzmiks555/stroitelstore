import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'

 export default function Products() {

    const router = useRouter();


    const [data, setData] = useState([])
    const [attributes, setAttributes] = useState([])


    function fetchData(id) {
        fetch(`http://localhost/api/products/${id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    function fetchAttributes(id) {
        fetch(`http://localhost/api/goods_attributes?good_id=${id}`)
        .then(res => res.json())
        .then(json => {
            setAttributes(json)
            console.log(json)
        })
    }


    useEffect(() => { 
        fetchData(router.query.id)
        fetchAttributes(router.query.id)
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
                    <h2>Фотографии</h2>
                    <div className={styles.images_block}>

                    </div>
                    <h2>Характеристики</h2>
                    <div className={styles.attributes_block}>
                        <table>
                            <thead>
                                <td>
                                    ID
                                </td>
                                <td>
                                    Атрибут
                                </td>
                                <td>
                                    Значение
                                </td>
                            </thead>
                            <tbody>
                               {
                                   attributes.map(item => (
                                       <tr>
                                           <td>
                                               {item?.id}
                                           </td>
                                           <td>
                                               {item['attribute.title']}
                                           </td>
                                           <td>
                                               {item?.value}
                                           </td>
                                       </tr>
                                   ))
                               }
                            </tbody>
                        </table>
                    </div>
                    <h2>Описание</h2>
                    <textarea>

                    </textarea>
                </div>
            </div>


         </Layout>
     )
 }