import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Products() {

    const [data, setData] = useState([])
    const [pagination, setPagination] = useState(1)
    const [groups, setGroups] = useState([])
    const [group_id, setGroupId] = useState(null)

    function fetchData(page, group_id) {
        
        if (group_id != null) {
            fetch(`http://kassa1/api/products?page=${page}&group_id=${group_id}`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        } else {
            fetch(`http://kassa1/api/products?page=${page}`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        }

    }

    function fetchGroups() {
        fetch(`http://kassa1/api/groups`)
        .then(res => res.json())
        .then(json => {
            setGroups(json.rows)
            console.log(json.rows)
        })
    }

    function handlePagination(e) {
        setPagination(+e.target.id)
    }

    function handleSelect(e) {
        setGroupId(e.target.value)
        setPagination(1)
    }


    useEffect(() => {
        fetchData(pagination, group_id)
        fetchGroups()
    }, [group_id , data[0], pagination, groups.guid])


     return (
         <Layout title="Продукты">
             <div className={styles.header}>
                Всего продуктов: {data?.count}
            </div>
            <div className={styles.filters}>
                <label>
                    Группа
                </label>
                <select onChange={handleSelect}>
                    {
                        groups?.map(item => (
                            <option value={item?.guid}>
                                {item.title}
                            </option>
                        ))
                    }
                </select>
            </div>
            <table className={styles.products_table}>
                <thead>
                    <tr>
                        <td>
                            Изображение
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
                                    <img className={styles.product_img} alt="" src={`http://localhost/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                </td>
                                <td>
                                    {item.prices_and_count?.sku}
                                </td>
                                <td>
                                    <Link href={`/products/${item.guid}`}>
                                        <a>{item.title}</a>
                                    </Link>
                                </td>
                                <td>
                                    {item.prices_and_count?.amount}
                                </td>
                                <td>
                                    {item.prices_and_count?.unit}
                                </td>
                                <td>
                                    {item.prices_and_count?.price}
                                </td>
                                <td>
                                    {item.group?.title}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={styles.pagination}>
                <ul>
                    <li>
                        <a id={1} onClick={handlePagination}>{'<'}</a>
                    </li>
                    { pagination - 4 > 1 - 1 ? (
                    <li>
                        <a id={pagination - 4} onClick={handlePagination}>{pagination - 4}</a>
                    </li>
                    ) : null}
                     { pagination - 3 >  1 - 1? (
                    <li>
                        <a id={pagination - 3} onClick={handlePagination}>{pagination - 3}</a>
                    </li>
                    ) : null}
                     { pagination - 2 > 1 - 1 ? (
                    <li>
                        <a id={pagination - 2} onClick={handlePagination}>{pagination - 2}</a>
                    </li>
                    ) : null}
                     { pagination - 1 >  1 - 1 ? (
                    <li>
                        <a id={pagination - 1} onClick={handlePagination}>{pagination - 1}</a>
                    </li>
                    ) : null}
                    <li>
                        <a id={pagination} onClick={handlePagination}>{pagination}</a>
                    </li>
                    { pagination + 1 < Math.floor(data?.count / 10) + 1 ? (
                    <li>
                        <a id={pagination + 1} onClick={handlePagination}>{pagination + 1}</a>
                    </li>
                    ) : null}
                     { pagination + 2 < Math.floor(data?.count / 10) + 1 ? (
                    <li>
                        <a id={pagination + 2} onClick={handlePagination}>{pagination + 2}</a>
                    </li>
                    ) : null}
                     { pagination + 3 < Math.floor(data?.count / 10) + 1 ? (
                    <li>
                        <a id={pagination + 3} onClick={handlePagination}>{pagination + 3}</a>
                    </li>
                    ) : null}
                     { pagination + 4 < Math.floor(data?.count / 10) + 1 ? (
                    <li>
                        <a id={pagination + 4} onClick={handlePagination}>{pagination + 4}</a>
                    </li>
                    ) : null}
                    <li>
                        <a id={Math.floor(data?.count / 10) + 1} onClick={handlePagination}>{">"}</a>
                    </li>
                </ul>
            </div>


         </Layout>
     )
 }