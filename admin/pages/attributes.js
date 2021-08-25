import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Attributes() {

    const [data, setData] = useState([])

    function fetchData(page) {
        fetch(`http://localhost/api/attributes`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    useEffect(() => {
        fetchData()
    }, [data[0]])


     return (
         <Layout title="Атрибуты">
             <div className={styles.header}>
                Всего атрибутов: {data?.count}
            </div>
            <table>
                <thead>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Название
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
                                    {item.id}
                                </td>
                                <td>
                                    <Link href={`/products/${item.guid}`}>
                                        <a>{item.title}</a>
                                    </Link>
                                </td>
                                <td>
                                    {item['group.title']}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>



         </Layout>
     )
 }