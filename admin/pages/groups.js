import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Groups() {

    const [data, setData] = useState([])
    const [subdata, setSubdata] = useState([])
    const [pagination, setPagination] = useState(1)
    




    function fetchData() {
        fetch(`http://localhost/api/groups`)
        .then(res => res.json())
        .then(json => {

            let groups = {count: json?.count, rows: []}, subgroups = [];

            json.rows.forEach(element => {
                if (element.parent_group == 'null') {
                    groups.rows.push({
                        title: element.title,
                        guid: element.guid
                    })
                } else {
                    subgroups.push({
                        title: element.title,
                        guid: element.guid,
                        parent_group: element.parent_group
                    })
                }
            });
            setData(groups)
            setSubdata(subgroups)
        })
    }


    useEffect(() => {
        fetchData(null)
    }, [data?.count ])


     return (
         <Layout title="Группы">
             <div className={styles.header}>
                Всего групп: {data?.count}
            </div>
            <table>
                <thead>
                    <tr>
                        <td>
                            GUID
                        </td>
                        <td>
                            Название
                        </td>
                        <td>
                            Подгруппа
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.rows?.map(item => (
                            <tr>
                                <td>
                                    <a>{item.guid}</a>
                                </td>
                                <td>
                                    <a><b>{item.title}</b></a>
                                </td>
                                <td>
                                    {
                                        subdata.filter(subitem => {return subitem.parent_group == item.guid}).map(subitem => (
                                            <span>{subitem.title}, </span>
                                        ))
                                    }
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


         </Layout>
     )
 }