import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'
import {  Table, TableContainer , FormGroup, FormControlLabel, Checkbox, TableHead, TableRow, TableCell,Button, TableBody, TablePagination, Autocomplete, TextField, InputBase, Paper, Chip } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import HOST from '../HOST.js'
import StarIcon from '@mui/icons-material/Star';
import Loader from "../components/Loader/Loader";

 export default function Products() {

    const [data, setData] = useState([])
    const [selected, setSelected] = useState([])
    const [pagination, setPagination] = useState(1)
    const [groups, setGroups] = useState([])
    const [group_id, setGroupId] = useState(null)
    const [groupOpt, setGroupOpt] = useState([])
    const [attrOpt, setAttrOpt] = useState([])
    const [attributeList, setAttributeList] = useState([])
    const [selectedAttr, setselectedAttr] = useState(null)
    const [newAttrValue, setNewAttrValue]  = useState('') 
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)


    function fetchData(page, group_id) {
        
        if (group_id != null) {
            fetch(`http://${HOST.host}/api/products?page=${page}&group_id=${group_id}&limit=100`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        } else {
            fetch(`http://${HOST.host}/api/products?page=${page}&limit=100`)
            .then(res => res.json())
            .then(json => {
                setData(json)
                console.log(json)
            })
        }

    }


    function fetchAttributeList(id) {
        fetch(`http://${HOST.host}/api/attributes?group_id=${id}`)
        .then(res => res.json())
        .then(json => {
            setAttributeList(json.rows)
            console.log(json.rows)
            let opts = json.rows?.map(item => {
                return {label: item?.title, id: item?.id}
            })
            setAttrOpt(opts)
        })
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
        setSelected([])
    }

    function handleAttribute(e) {
        
        setselectedAttr(e)


    }

    function handleCheckBox(e, id) {

        let newSelected = [];

        const selectedIndex = selected.indexOf(id);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
          } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
          } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
          } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1),
            );
          }


        setSelected(newSelected)


    }

    function handleCreateValue(e) {




        let body = []

        selected?.forEach(item => {
            body.push({
                good_id: item,
                value: newAttrValue,
                attr_id: selectedAttr?.id
            })
        })

        fetch(`http://${HOST.host}/api/goods_attributes/bulk`, {
            method: 'POST',
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            window.location.reload()
        })


        console.log(body)

    }

    function handleImage(e) {
        e.preventDefault()
        console.log(file)

        selected?.forEach((item, index) => {
            const fdata = new FormData();
            fdata.append('file', file);
            fdata.append('name', item);

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
                if (index == selected.length - 1 ) {
                    window.location.reload()
                }
            })




        })

        

    }

    function handleImageInput(e) {
        setFile(e.target.files[0]);
        setFileName(e.target.value)
    }

    useEffect(() => {
        fetchData(pagination, group_id)
        fetchGroups()
        fetchAttributeList(group_id)
    }, [group_id , data[0], pagination, groups.guid])


     return (
         <Layout title="Продукты">
             <div className={styles.header}>
                Всего продуктов: {data?.count?.length}
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
            {
                (selected?.length > 0 && group_id != null && group_id != undefined) && (
                    <div className={styles.filters}>
                        <Autocomplete
                            onChange={(e, value) => {handleAttribute(value)}}
                            options={attrOpt}
                            value={selectedAttr}
                            disablePortal
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Атрибут" />}
                        />
                        <TextField value={newAttrValue} onChange={e => {setNewAttrValue(e.target.value)}} label='Значение'></TextField>
                        <Button onClick={handleCreateValue} variant='contained'>Добавить аттрибут</Button>
                        
                            <form className={styles.images_block_header} onSubmit={handleImage} enctype="multipart/form-data">
                                <div className={styles.drop_area}>
                                    <span>{fileName}</span>
                                    <input type="file" id="filedata" onChange={handleImageInput}></input>
                                </div>
                                <Button type='submit' variant='contained'>
                                    Добавить изображение
                                </Button>
                            </form>
                    </div>
                    
                )
            }
            
            {
                data?.rows?.length > 0 ? <Paper variant='outlined'>
                <TableContainer>
                    <Table hover size='small'>
                        <TableHead>
                            <TableRow >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    color="primary"
                                    // checked={isItemSelected}
                                    // inputProps={{
                                    //     'aria-labelledby': labelId,
                                    // }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Хит
                                </TableCell>
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
                                <TableCell>
                                    Атрибуты
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data?.rows?.map(item => (
                                    <TableRow hover role="checkbox">
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            color="primary"
                                            onClick={e => {handleCheckBox(e, item?.guid)}}
                                            // checked={isItemSelected}
                                            // inputProps={{
                                            //     'aria-labelledby': labelId,
                                            // }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.hits?.[0]?.hit && <StarIcon></StarIcon>}
                                            
                                        </TableCell>
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
                                        <TableCell>
                                            {/* {
                                                item?.filter_1?.map(attr => (
                                                    <Chip color='info' label={attr?.attribute?.title}>
                                                        
                                                    </Chip>
                                                ))
                                            } */}
                                            
                                            {
                                                attributeList?.map(attr => (
                                                        <Chip sx={{mr: 1, mb: 1}} color={item?.filter_1?.findIndex(i => i.attr_id == attr?.id) == -1 ?  'default' : 'info' } label={attr?.title}>
                                                            {console.log()}
                                                        </Chip>
                                                ))
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[100]}
                    component="div"
                    count={data?.count?.length}
                    rowsPerPage={100}
                    page={pagination}
                    onPageChange={handlePagination}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper> : <Loader></Loader>
            }

           


         </Layout>
     )
 }