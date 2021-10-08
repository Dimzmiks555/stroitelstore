import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'
import HOST from "../../HOST.js";
import {Input, Button} from 'react-bootstrap';

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
        fetch(`http://${HOST.host}/api/products/${id}`)
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
        fetch(`http://${HOST.host}/api/goods_attributes?good_id=${id}`)
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
         <Layout title="Продукт">
             
            <div className={styles.product}>
                <div className={styles.main_info}>
                    
                    <div className={styles.main_header}>
                        <Button variant='danger' onClick={handleBack}>
                            Назад
                        </Button>
                        <div className={styles.group}>
                            <span>{data[0]?.group?.title}</span>
                        </div>
                    </div>
                    {
                        data[0] ? (
                            <div>
                                <h1>{data[0]?.title}</h1>
                                <h3>{data[0]?.prices_and_count?.amount == 0 ? 'Нет в наличии' : ' В наличии '}</h3>
                                
                                <h3>Артикул: {data[0]?.prices_and_count?.sku}</h3>
                                <h3>Цена: {data[0]?.prices_and_count?.price}</h3>
                                <h3>Количество: {data[0]?.prices_and_count?.amount} {data[0]?.prices_and_count?.unit}</h3>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles.additional_info}>
                    
                    <div className={styles.id}>ID {data[0]?.guid}</div>
                    <h2>Фотографии</h2>
                    <div className={styles.images_block}>

                        <div className={styles.gallery}>
                            {data[0]?.images?.map(item => {
                                return item.main == true ? (
                                    <img className={styles.main_img} src={`http://${HOST.host}/uploads/${item.url}`}>
    
                                    </img>
                                ) : (
                                    <img src={`http://${HOST.host}/uploads/${item.url}`}>
    
                                    </img>
                                )
                            })}
                        </div>

                        <form className={styles.images_block_header} onSubmit={handleImage} enctype="multipart/form-data">
                            <div className={styles.drop_area}>
                                <span>Нажмите или перебросьте для загрузки...</span>
                                <span>{fileName}</span>
                                <input type="file" id="filedata" onChange={handleImageInput}></input>
                            </div>
                            <button>
                                Добавить
                            </button>
                        </form>
                        <div>

                        </div>
                    </div>
                    <h2>Характеристики</h2>
                    <div className={styles.attributes_block}>


                        {
                            attributeList.map(item => (
                                attributes?.filter(attr => {return attr?.attr_id == item?.id}).length > 0 ? 
                                (
                                    <div className={styles.attribute} key={item?.id}>
                                        <div>
                                            {item?.title}
                                        </div>
                                        <div>
                                            {attributes?.filter(attr => {return attr?.attr_id == item?.id})[0]?.value}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.attribute} key={item?.id}>
                                        
                                        {console.log(attributes, attributeList, 'YES')}
                                        <div>
                                            <label>
                                                {item?.title}
                                            </label>
                                        </div>
                                        <input id={item?.id} value={newAttr[`attr_${item?.id}`]} onChange={handleInput}></input>
                                        <div>
                                            <button id={item?.id}  onClick={handleSubmit}>
                                                Добавить
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))
                        }

                    </div>
                    <div className={styles.desc__block}>
                        <h2>Описание</h2>
                        <button onClick={handleTextArea}>
                            Сохранить
                        </button>
                        <textarea value={textarea} onChange={e => setTextArea(e.target.value)}>

                        </textarea>
                    </div>
                </div>
            </div>


         </Layout>
     )
 }