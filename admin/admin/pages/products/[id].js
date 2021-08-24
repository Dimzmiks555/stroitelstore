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
             
            <div>
                <h1>{data[0]?.rows.title}</h1>
            </div>

         </Layout>
     )
 }