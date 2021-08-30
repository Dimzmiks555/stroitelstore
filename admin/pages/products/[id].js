import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from './id.module.css'
import { useRouter} from 'next/router'

 export default function Products() {

    const router = useRouter();


    const [data, setData] = useState([])
    const [attributes, setAttributes] = useState([])
    const [attributeList, setAttributeList] = useState([])

    const [newAttrId, setNewAttrId] = useState(null)
    const [newValue, setNewValue] = useState(null)

    function fetchData(id) {
        fetch(`http://kassa1/api/products/${id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }


    function fetchAttributes(id) {
        fetch(`http://kassa1/api/goods_attributes?good_id=${id}`)
        .then(res => res.json())
        .then(json => {
            setAttributes(json)
            console.log(json)
        })
    }

    function fetchAttributeList(id) {
        fetch(`http://kassa1/api/attributes?group_id=${id}`)
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

            fetch(`http://kassa1/api/goods_attributes`, {
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
        e.preventDefault()

        const formData = new FormData(e.target.form);
        
        
        fetch('http://localhost/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then(res => console.log(res))

        

    }


    useEffect(() => { 
        fetchData(router.query.id)
        fetchAttributes(router.query.id)
        fetchAttributeList(data[0]?.group_id)
    }, [ router.query.id, data[0]?.group_id])


     return (
         <Layout title="Продукт">
             
            <div className={styles.product}>
                <div className={styles.main_info}>
                    {
                        data[0] ? (
                            <div>
                                <h1>{data[0]?.title}</h1>
                                <h3>{data[0]['prices_and_count.amount'] == 0 ? 'Нет в наличии' : ' В наличии '}</h3>
                                <h2>Группа: {data[0]['group.title']}</h2>
                                <h3>Артикул: {data[0]['prices_and_count.sku']}</h3>
                                <h3>Цена: {data[0]['prices_and_count.price']}</h3>
                                <h3>Количество: {data[0]['prices_and_count.amount']} {data[0]['prices_and_count.unit']}</h3>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles.additional_info}>
                    <h2>Фотографии</h2>
                    <div className={styles.images_block}>
                        <form className={styles.images_block_header} onSubmit={handleImage}>
                            <input type="file" ></input>
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
                    <h2>Описание</h2>
                    <textarea>

                    </textarea>
                </div>
            </div>


         </Layout>
     )
 }