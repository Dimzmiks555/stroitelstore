import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'
import {Input, Button, Table} from 'react-bootstrap';
import HOST from '../HOST.js'
import { style } from "@mui/system";
 export default function Groups() {

    const [data, setData] = useState([])
    const [subdata, setSubdata] = useState([])
    const [pagination, setPagination] = useState(1)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)




    function handleImage(e) {
        e.preventDefault()
        console.log(file)

        const fdata = new FormData();
        fdata.append('file', file);
        fdata.append('name', 'AVRORA');



        console.log(fdata.body)
        
        fetch(`http://${HOST.host}/api/upload/avrora`, {
            method: 'POST',
            body: fdata,
        })
        .then(res => {
            console.log(res);
            // window.location.reload();
        })

        

    }

    function handleImageInput(e) {
        setFile(e.target.files[0]);
        setFileName(e.target.value)
    }



     return (
         <Layout title="Прайслисты">
             <div className={styles.pricelists}>
                <div className={styles.select_company}>
                    <ul>
                        <li><a>АВРОРА</a></li>
                    </ul>
                </div>
                <div className={styles.pricelists_action}>
                    <form className={styles.images_block_header} onSubmit={handleImage} enctype="multipart/form-data">
                        <div className={styles.drop_area}>
                            <span>{fileName}</span>
                            <input type="file" id="filedata" onChange={handleImageInput}></input>
                        </div>
                        <button>
                            Отправить
                        </button>
                    </form>
                </div>
             </div>


         </Layout>
     )
 }