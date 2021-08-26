import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Attributes() {

    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [attrValue, setAttrValue] = useState([])
    const [groupID, setGroupID] = useState([])

    function fetchData(page) {
        fetch(`http://localhost/api/attributes`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    function fetchGroups(page) {
        fetch(`http://localhost/api/groups`)
        .then(res => res.json())
        .then(json => {
            setGroups(json.rows)
            console.log(json)
        })
    }

    function handleAttrValue(e) {
        setAttrValue(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        fetch(`http://localhost/api/groups`, {
            method: 'POST',
            body: {
                group_id: groupID,
                title: attrValue
            }
        })
        .then(res => res.json())
        .then(json => {
            setGroups(json.rows)
            console.log(json)
        })

    }


    useEffect(() => {
        fetchData()
        fetchGroups()
    }, [data[0]])


     return (
         <Layout title="Атрибуты">
             
             <div className={styles.attributes}>
                 <div>

                    <h2>Создать атрибут</h2>

                    <form>
                        <label>
                            Название
                        </label>
                        <input value={attrValue} onChange={handleAttrValue}>
                        </input>
                        <label>
                            Группа
                        </label>
                        <select>
                            {
                                groups?.map(item => (
                                    <option value={item.guid}>{item.title}</option>
                                ))
                            }
                        </select>

                        <button onCLick={handleSubmit}>
                            Создать
                        </button>

                    </form>



                 </div>
                 <div>
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
                                            {item.title}
                                        </td>
                                        <td>
                                            {item['group.title']}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                 </div>
             </div>

         </Layout>
     )
 }