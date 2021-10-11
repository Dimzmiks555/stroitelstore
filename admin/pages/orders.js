import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'
import HOST from '../HOST.js'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Autocomplete, TextField, Button, Chip } from "@mui/material";


 export default function Orders() {

    const [data, setData] = useState([])
    const [optID, setOptID] = useState([])
    const [optConsumer, setOptConsumer] = useState([])

    function fetchData(page) {
        fetch(`http://${HOST.host}/api/orders`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)

            let optsID = json?.rows?.map(item => {
                return {
                    label: item?.id
                }
            })


            setOptID(optsID)


        })

        fetch(`http://${HOST.host}/api/users`)
        .then(res => res.json())
        .then(json => {
            // setData(json)
            console.log(json)

            let optConsumers = json?.filter(itm => (itm?.surname))?.map(item => {
                
                return {
                    label: `${item.surname} ${item?.name}`
                }

            })

            setOptConsumer(optConsumers)


        })

    }




    useEffect(() => {
        fetchData()
    }, [data[0]])


     return (
         <Layout title="Заказы">
             
             <div className={styles.orders}>
                 <div>
                    <div className={styles.header}>
                        Всего заказов: {data?.count}
                    </div>
                    <div className={styles.filters}>
                        <Autocomplete
                            // onChange={(e, value) => {handleSelect(value)}}
                            options={optID}
                            disablePortal
                            sx={{ width: 120 }}
                            renderInput={(params) => <TextField {...params} label="ID" />}
                        />
                        <Autocomplete
                            // onChange={(e, value) => {handleSelect(value)}}
                            options={optConsumer}
                            disablePortal
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Покупатель" />}
                        />
                        <Autocomplete
                            // onChange={(e, value) => {handleSelect(value)}}
                            options={[
                                'Самовывоз',
                                'Доставка'
                            ]}
                            disablePortal
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Способ получения" />}
                        />
                        <Autocomplete
                            // onChange={(e, value) => {handleSelect(value)}}
                            options={[
                                'Наличные',
                                'Онлайн'
                            ]}
                            disablePortal
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Способ оплаты" />}
                        />
                        <Autocomplete
                            // onChange={(e, value) => {handleSelect(value)}}
                            options={[
                                'На рассмотрении',
                                'Завершен',
                                'Отменен',
                                'Готов к выдаче'
                            ]}
                            disablePortal
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Статус" />}
                        />
                    </div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Номер заказа
                                    </TableCell>
                                    <TableCell>
                                        Адрес
                                    </TableCell>
                                    <TableCell>
                                        Покупатель
                                    </TableCell>
                                    
                                    <TableCell>
                                        Способ получения
                                    </TableCell>
                                    <TableCell>
                                        Способ оплаты
                                    </TableCell>
                                    <TableCell>
                                        Статус
                                    </TableCell>
                                    <TableCell>
                                        Сумма заказа
                                    </TableCell>
                                    <TableCell>
                                        Дата
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data?.rows?.map(item => (
                                        <TableRow
                                            hover
                                        >
                                            <TableCell>
                                                {item.id}
                                            </TableCell>
                                            <TableCell>
                                                {item?.address}
                                            </TableCell>
                                            <TableCell>
                                                {item.user?.surname} {item.user?.name}
                                            </TableCell>
                                            <TableCell>
                                                {item?.type == 'shop' ? "Самовывоз" : "Доставка"}
                                            </TableCell>
                                            <TableCell>
                                                {item?.payment == 'nal' ? "Наличные" : "Карта"}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                item?.status == 'waiting' ? (<Chip color='default' label='На рассмотрении'></Chip>)  :
                                                item?.status == 'ready' ? (<Chip color='info' label='Готов к выдаче'></Chip>) : 
                                                item?.status == 'complete' ? (<Chip color='success' label='Выполнен'></Chip>) :
                                                item?.status == 'cancel' ? (<Chip color='error' label='Отменен'></Chip>) : 
                                                item?.status == 'work' ? (<Chip color='warning' label='В работе'></Chip>) : 
                                                null
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {item?.total}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(item?.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/orders/${item?.id}`}>
                                                    <Button variant='outlined'>Подробнее</Button>
                                                </Link>
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