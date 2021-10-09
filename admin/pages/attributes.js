import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'

import HOST from '../HOST.js'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Box, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete, Button } from "@mui/material";
// import { Box } from "@mui/system";

 export default function Attributes() {

    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [attrValue, setAttrValue] = useState([])
    const [groupID, setGroupID] = useState([])
    const [options, setOptions] = useState([])

    function fetchData(page) {
        fetch(`http://${HOST.host}/api/attributes`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    function fetchGroups(page) {
        fetch(`http://${HOST.host}/api/groups`)
        .then(res => res.json())
        .then(json => {
            setGroups(json.rows)

            let opts = json.rows?.map(item => {
                return {label: item?.title, id: item?.guid}
            })
            setOptions(opts)

            console.log(opts)
        })
    }

    function handleAttrValue(e) {
        setAttrValue(e.target.value)
    }

    function handleSelect(e) {
        setGroupID(e.target.value)
    }

    
    function handleSubmit(e) {

        console.log({
                    group_id: groupID,
                    title: attrValue
                })

        fetch(`http://${HOST.host}/api/attributes`, {
            method: 'POST',
            body: JSON.stringify({
                group_id: groupID,
                title: attrValue
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => console.log(res))

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

                    <Box component='form' onSubmit={handleSubmit} sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }} >
                        <TextField 
                            label='Название'
                            value={attrValue}
                            onChange={handleAttrValue}
                        />
                        {/* <FormControl fullWidth>
                            <InputLabel id="group">Группа</InputLabel>
                            <Select 
                                autoWidth
                                labelId="group"
                                id="demo-simple-select"
                                value={groupID}
                                label="Группа"
                                onChange={handleSelect}
                            >
                                {
                                    groups?.map(item => (
                                        <MenuItem value={item.guid}>{item.title}</MenuItem>
                                    ))
                                }
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}

                        <Autocomplete
                            options={options}
                            disablePortal
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Группа" />}
                        />

                        <Button variant="contained">
                            Создать
                        </Button>

                    </Box>



                 </div>
                 <div>
                    <div className={styles.header}>
                        Всего атрибутов: {data?.count}
                    </div>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            Название
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
                                                    {item.id}
                                                </TableCell>
                                                <TableCell>
                                                    {item.title}
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
                    </Paper>
                 </div>
             </div>

         </Layout>
     )
 }