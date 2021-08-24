import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Attributes() {

    const [data, setData] = useState([])
    const [pagination, setPagination] = useState(1)

    function fetchData(page) {
        fetch(`http://localhost/api/products?page=${page}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    function handlePagination(e) {
        setPagination(+e.target.id)
    }

    useEffect(() => {
        fetchData(pagination)
    }, [data[0], pagination])


     return (
         <Layout title="Атрибуты">
             <div className={styles.header}>
                Всего продуктов: {data?.count}
            </div>
            <table>
                <thead>
                    <tr>
                        <td>
                            GUID
                        </td>
                        <td>
                            Артикул
                        </td>
                        <td>
                            Название
                        </td>
                        <td>
                            Кол-во
                        </td>
                        <td>
                            Ед. изм
                        </td>
                        <td>
                            Цена
                        </td>
                        <td>
                            Группа
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.rows?.map(item => (
                            <tr>
                                <td>
                                    {item.guid}
                                </td>
                                <td>
                                    {item['prices_and_count.sku']}
                                </td>
                                <td>
                                    <Link href={`/products/${item.guid}`}>
                                        <a>{item.title}</a>
                                    </Link>
                                </td>
                                <td>
                                    {item['prices_and_count.amount']}
                                </td>
                                <td>
                                    {item['prices_and_count.unit']}
                                </td>
                                <td>
                                    {item['prices_and_count.price'].toLocaleString()}
                                </td>
                                <td>
                                    {item['group.title']}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={styles.pagination}>
                <ul>
                    <li>
                        <a id={1} onClick={handlePagination}>{1}</a>
                    </li>
                    <li>
                        <a id={pagination + 1} onClick={handlePagination}>{pagination + 1}</a>
                    </li>
                    <li>
                        <a id={pagination + 2} onClick={handlePagination}>{pagination + 2}</a>
                    </li>
                    <li>
                        <a id={pagination + 3} onClick={handlePagination}>{pagination + 3}</a>
                    </li>
                    <li>
                        <a id={pagination + 4} onClick={handlePagination}>{pagination + 4}</a>
                    </li>
                    <li>
                        <a id={data?.count} onClick={handlePagination}>{data?.count}</a>
                    </li>
                </ul>
            </div>


         </Layout>
     )
 }