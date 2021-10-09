import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'
import HOST from "../../HOST.js";
import {Button, TableContainer, TextField, Table, TableHead, TableBody, TableRow, TableCell, Alert, Chip, Divider} from '@mui/material'
// import { Divider } from "antd";


 export default function Products() {

    const router = useRouter();


    const [data, setData] = useState([])
    const [attributes, setAttributes] = useState([])
    const [attributeList, setAttributeList] = useState([])

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)

    const [newAttr, setNewAttr] = useState({})

    const [textarea, setTextArea] = useState('')


    function fetchData(id) {
        fetch(`http://${HOST.host}/api/orders/${id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }

    function fetchDesc(id) {
        fetch(`http://${HOST.host}/api/descriptions/${id}`)
        .then(res => res.json())
        .then(json => {
            setTextArea(json[0]?.text)
            console.log(json)
        })
    }


    function fetchAttributes(id) {
        fetch(`http://${HOST.host}/api/orders/${id}`)
        .then(res => res.json())
        .then(json => {
            setAttributes(json)
            console.log(json)
        })
    }

    function fetchAttributeList(id) {
        fetch(`http://${HOST.host}/api/attributes?group_id=${id}`)
        .then(res => res.json())
        .then(json => {
            setAttributeList(json.rows)
            console.log(json.rows)
        })
    }

    function handleInput(e) {
        
        newAttr[`attr_${e.target.id}`] = e.target.value

        console.log(newAttr)

        // setNewAttr(e.target.value)
    }

    function handleSubmit(e) {
        if (newAttr[`attr_${e.target.id}`] != null) {

            let data = {
                good_id: router.query.id,
                attr_id: +e.target.id,
                value: newAttr[`attr_${e.target.id}`]?.trim()
            }

            fetch(`http://${HOST.host}/api/goods_attributes`, {
                method: 'POST',
                headers: {
                    "Accept" : "application/json",
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                window.location.reload()
            })


            console.log(JSON.stringify(data))

        }
    }

    function handleImage(e) {
        e.preventDefault()
        console.log(file)

        const fdata = new FormData();
        fdata.append('file', file);
        fdata.append('name', router.query.id);

        console.log(data )

        if(data[0]?.images.length > 0 ) {
            fdata.append('main', 'false');
        } else {
            fdata.append('main', 'true');
        }

        console.log(fdata.body)
        
        fetch(`http://${HOST.host}/api/upload`, {
            method: 'POST',
            body: fdata,
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        })

        

    }

    function handleImageInput(e) {
        setFile(e.target.files[0]);
        setFileName(e.target.value)
    }


    function handleTextArea(e) {


        let data = {
            good_id: router.query.id,
            text: textarea.trim()
        }

        fetch(`http://${HOST.host}/api/descriptions`, {
            method: 'POST',
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })

    }

    function handleBack() {
        router.back()
    }

    useEffect(() => { 
        fetchData(router.query.id)
        fetchAttributes(router.query.id)
        fetchAttributeList(data[0]?.group_id)
        fetchDesc(router.query.id)
    }, [ router.query.id, data[0]?.group_id])


     return (
         <Layout title={`Заказ № ${router.query.id} от ${new Date(data?.createdAt).toLocaleDateString()} ${new Date(data?.createdAt).toLocaleTimeString()}`}>
             
            <div className={styles.order}>
                <div className={styles.main_info}>
                    
                    <div className={styles.main_header}>
                        <Button variant='outlined' onClick={handleBack}>
                            Назад
                        </Button>
                        <Chip color='default' label='На рассмотрении'></Chip>
                    </div>
                    {
                        data ? (
                            <div>
                                <h3>Адрес: {data?.address}</h3>
                                <h3>Оплата {data?.payment == 'nal' ? 'наличными' : ' онлайн'}</h3>
                                
                                <h3>Доставка: {data?.type == 'shop' ? 'Нет' : ' Да'}</h3>
                            </div>
                        ) : null
                    }
                    <Divider>
                        Действия
                    </Divider>
                    <div className={styles.buttons}>
                        <Button variant='contained' size="large">
                            Подтвердить
                        </Button>
                        <Button variant='contained' color='success' size="large" >
                            Готово
                        </Button>
                        <Button variant='text' color='error' size="large" >
                            Отменить
                        </Button>
                    </div>
                </div>
                <div className={styles.additional_info}>
                    <h1>Итого {data?.total} рублей</h1>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Наименование
                                        </TableCell>
                                        <TableCell>
                                            Кол-во
                                        </TableCell>
                                        <TableCell>
                                            Цена
                                        </TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                        data?.order_products?.map(item => (
                                            <TableRow 
                                                hover
                                            >
                                                <TableCell>
                                                    {item?.good?.title}
                                                </TableCell>
                                                <TableCell>
                                                    {item?.count}
                                                </TableCell>
                                                <TableCell>
                                                    {item?.price} Р
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    
                    
                </div>
            </div>


         </Layout>
     )
 }