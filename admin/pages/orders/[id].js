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
    const [users, setUsers] = useState([])

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

    function fetchUsers() {
        fetch(`http://${HOST.host}/api/users/`)
        .then(res => res.json())
        .then(json => {
            setUsers(json)
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



    function handleBack() {
        router.back()
    }

    function handleStatus(e) {

        let data = {
            status: e.target.id
        }

        console.log(data)

        fetch(`http://${HOST.host}/api/orders/${router.query.id}`, {
            method: 'POST',
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            router.reload()
        })
    }

    useEffect(() => { 
        fetchData(router.query.id)
        fetchAttributes(router.query.id)
        fetchAttributeList(data[0]?.group_id)
        fetchDesc(router.query.id)
        fetchUsers()
    }, [ router.query.id, data[0]?.group_id])


     return (
         <Layout title={`?????????? ??? ${router.query.id} ???? ${new Date(data?.createdAt).toLocaleDateString()} ${new Date(data?.createdAt).toLocaleTimeString()}`}>
             
            <div className={styles.order}>
                <div className={styles.main_info}>
                    
                    <div className={styles.main_header}>
                        <Button variant='outlined' onClick={handleBack}>
                            ??????????
                        </Button>
                        {
                            data?.payments?.[0]?.paid == true ? (<Chip  color='success' label='????????????????'></Chip>) :
                            data?.payments?.[0]?.paid == false ? (<Chip color='error' label='??e ????????????????'></Chip>) :
                            null
                        }
                        {
                        data?.status == 'waiting' ? (<Chip color='default' label='???? ????????????????????????'></Chip>)  :
                        data?.status == 'ready' ? (<Chip color='info' label='?????????? ?? ????????????'></Chip>) : 
                        data?.status == 'complete' ? (<Chip color='success' label='????????????????'></Chip>) :
                        data?.status == 'cancel' ? (<Chip color='error' label='??????????????'></Chip>) : 
                        data?.status == 'work' ? (<Chip color='warning' label='?? ????????????'></Chip>) : 
                        null
                        }
                    </div>

                    <h1>{data?.surname + ' ' + data.name}</h1>
                    <h2>{data?.phone}</h2>
                    {
                        data ? (
                            <div>
                                <h3>??????????: {data?.address}</h3>
                                <h3>???????????? {data?.payment == 'nal' ? '??????????????????' : ' ????????????'}</h3>
                                
                                <h3>????????????????: {data?.type == 'shop' ? '??????' : ' ????'}</h3>
                            </div>
                        ) : null
                    }
                    <Divider>
                        ????????????????
                    </Divider>
                    <div className={styles.buttons}>
                        <Button id='work' variant='contained' color='warning' size="large" onClick={handleStatus}>
                            ?? ????????????
                        </Button>
                        
                        {
                            data?.status == 'work' ? (
                                <Button id='ready' variant='contained' color='info' size="large" onClick={handleStatus} >
                                    ?????????? ?? ????????????
                                </Button>
                            ) : (
                                <Button id='complete'disabled variant='contained' color='success' size="large">
                                    ?????????? ?? ????????????
                                </Button>
                            )
                        }
                        {
                            data?.status == 'ready' ? (
                                <Button id='complete' variant='contained' color='success' size="large" onClick={handleStatus} >
                                    ????????????????
                                </Button>
                            ) : (
                                <Button id='complete'disabled variant='contained' color='success' size="large">
                                    ????????????????
                                </Button>
                            )
                        }
                        <Button id='cancel' variant='text' color='error' size="large" onClick={handleStatus} >
                            ????????????????
                        </Button>
                    </div>
                </div>
                <div className={styles.additional_info}>
                    <h1>?????????? {data?.total} ????????????</h1>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ????????????????????????
                                        </TableCell>
                                        <TableCell>
                                            ??????-????
                                        </TableCell>
                                        <TableCell>
                                            ????????
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
                                                    {item?.price} ??
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