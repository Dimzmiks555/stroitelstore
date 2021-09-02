import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'
import HOST from "../../HOST.js";


 export default function Products() {

    const router = useRouter();


    const [data, setData] = useState([])
    const [attributes, setAttributes] = useState([])
    const [attributeList, setAttributeList] = useState([])

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)

    const [newAttrId, setNewAttrId] = useState(null)
    const [newValue, setNewValue] = useState(null)

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

    function handleSelect(e) {
        setNewAttrId(e.target.value)
    }

    function handleInput(e) {
        
        setNewValue(e.target.value)
    }

    function handleSubmit(e) {
        if (newValue != null || newAttrId != null) {

            let data = {
                good_id: router.query.id,
                attr_id: +newAttrId,
                value: newValue.trim()
            }

            fetch(`http://${HOST.host}/api/goods_attributes`, {
                method: 'POST',
                headers: {
                    "Accept" : "application/json",
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            console.log(JSON.stringify(data))

        }
    }

    function handleImage(e) {

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
        .then(res => console.log(res))

        

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
                    
                    <button className={styles.back} onClick={handleBack}>
                        Назад
                    </button>
                    {
                        data[0] ? (
                            <div>
                                <h3>ID: {data[0]?.guid}</h3>
                                <h1>{data[0]?.title}</h1>
                                <h3>{data[0].prices_and_count?.amount == 0 ? 'Нет в наличии' : ' В наличии '}</h3>
                                <h2>Группа: {data[0].group?.title}</h2>
                                <h3>Артикул: {data[0].prices_and_count?.sku}</h3>
                                <h3>Цена: {data[0]?.prices_and_count?.price}</h3>
                                <h3>Количество: {data[0]?.prices_and_count?.amount} {data[0]?.prices_and_count?.unit}</h3>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles.additional_info}>
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

                        <div className={styles.header}>

                            <div>
                                <label>
                                    Атрибут
                                </label>
                                <select onChange={handleSelect}>
                                    <option value={null}>Выберите атрибут...</option>
                                    {
                                        attributeList.map(item => (
                                            <option value={item?.id}>{item?.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label>
                                    Значение
                                </label>
                                <input value={newValue} onChange={handleInput}></input>
                            </div>
                            <div>
                                <button  onClick={handleSubmit}>
                                    Добавить
                                </button>
                            </div>

                        </div>

                        <table>
                            <thead>
                                <td>
                                    ID
                                </td>
                                <td>
                                    Атрибут
                                </td>
                                <td>
                                    Значение
                                </td>
                            </thead>
                            <tbody>
                               {
                                   attributes.map(item => (
                                       <tr>
                                           <td>
                                               {item?.id}
                                           </td>
                                           <td>
                                               {item.attribute.title}
                                           </td>
                                           <td>
                                               {item?.value}
                                           </td>
                                       </tr>
                                   ))
                               }
                            </tbody>
                        </table>
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