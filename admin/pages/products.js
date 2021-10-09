import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'
import {  Table, TableContainer , FormGroup, FormControlLabel, Checkbox, TableHead, TableRow, TableCell, TableBody, TablePagination, Autocomplete, TextField, InputBase } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import HOST from '../HOST.js'
import Text from "antd/lib/typography/Text";

 export default function Products() {

    const [data, setData] = useState([])
    const [pagination, setPagination] = useState(1)
    const [groups, setGroups] = useState([])
    const [group_id, setGroupId] = useState(null)
    const [groupOpt, setGroupOpt] = useState([])


    function fetchData(page, group_id) {
        
        if (group_id != null) {
            fetch(`http://${HOST.host}/api/products?page=${page}&group_id=${group_id}`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        } else {
            fetch(`http://${HOST.host}/api/products?page=${page}`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        }

    }

    function fetchGroups() {
        fetch(`http://${HOST.host}/api/groups`)
        .then(res => res.json())
        .then(json => {
            setGroups(json.rows)
            console.log(json.rows)
            let opts = json.rows?.map(item => {
                return {label: item?.title, id: item?.guid}
            })
            setGroupOpt(opts)
        })
    }

    function handlePagination(e, val) {
        setPagination(val)
    }

    function handleSelect(e) {
        console.log(e?.id)
        setGroupId(e?.id)
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
                <Autocomplete
                    onChange={(e, value) => {handleSelect(value)}}
                    options={groupOpt}
                    disablePortal
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Группа" />}
                />
                <TextField label='Наименование'></TextField>
                
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Без изображений" />
                    {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                </FormGroup>
            </div>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Изображение
                            </TableCell>
                            <TableCell>
                                Артикул
                            </TableCell>
                            <TableCell>
                                Название
                            </TableCell>
                            <TableCell>
                                Кол-во
                            </TableCell>
                            <TableCell>
                                Ед. изм
                            </TableCell>
                            <TableCell>
                                Цена
                            </TableCell>
                            <TableCell>
                                Группа
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.rows?.map(item => (
                                <TableRow>
                                    <TableCell>
                                        <img className={styles.product_img} alt="" src={`http://${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                    </TableCell>
                                    <TableCell>
                                        {item.prices_and_count?.sku}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/products/${item.guid}`}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {item.prices_and_count?.amount}
                                    </TableCell>
                                    <TableCell>
                                        {item.prices_and_count?.unit}
                                    </TableCell>
                                    <TableCell>
                                        {item.prices_and_count?.price}
                                    </TableCell>
                                    <TableCell>
                                        {item.group?.title}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={data?.count}
                rowsPerPage={10}
                page={pagination}
                onPageChange={handlePagination}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />

           


         </Layout>
     )
 }