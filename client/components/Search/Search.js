import styles from './Search.module.css';
import CatalogStore from "../CatalogStore";
import {observer} from "mobx-react";
import {useState, useEffect} from 'react'
import Link from 'next/link';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const Search = observer(() => {
    const [display, setDisplay] = useState('none')
    const [value, setValue] = useState('')
    const [data, setData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [isLoading, setLoading] = useState([true]);
    
    function handleChange(e) {
        function Set() {
            if (e.target.value != '') {
                setValue(prevState => {
                    return e.target.value
                });
            } else {
                setValue('')
            }
        }
        Set()
    }
    function handleFocus(e) {
        setDisplay('block');
    }
    function handleBlur(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // Не срабатывает при перемещении фокуса между дочерними элементами
            setDisplay('none');
          }
    }
    function handleClick() {
        setDisplay('none')
        setValue('')
        CatalogStore.HideCatalog()
    }
     async function getData(text){

            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3"
                });

            if (text == '' || text == null) {
                setData([])
            } else {
                await api.get("products", {
                    per_page: 10,
                    search: text// 18 products per page
                })
                .then( result => {
                        setData(prevState => {
                            return result.data
                        });
                        setLoading(false)
                    }
                );

                await api.get("products/categories", {
                    per_page: 10,
                    search: text// 18 products per page
                })
                .then( result => {
                        setCatData(prevState => {
                            console.log(prevState)
                            console.log(result.data)
                            return result.data
                        });
                        setLoading(false)
                    }
                    )
                }
                
            }
            
    useEffect(() => {
        setLoading(true)
        async function getData(text){

            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3"
                });

            if (text == '' || text == null) {
                setData([])
            } else {
                await api.get("products", {
                    per_page: 10,
                    search: text// 18 products per page
                })
                .then( result => {
                        setData(prevState => {
                            return result.data
                        });
                        setLoading(false)
                    }
                );

                await api.get("products/categories", {
                    per_page: 10,
                    search: text// 18 products per page
                })
                .then( result => {
                        setCatData(prevState => {
                            console.log(prevState)
                            console.log(result.data)
                            return result.data
                        });
                        setLoading(false)
                    }
                    )
                }
                
            }
            
            
        
        if (value != '' && value.length > 1) {
            getData(value);
        } else {
            setData([])
            setCatData([])
        }


    }, [value]);

    return (
        <div className={styles.search__box} onBlur={e => {handleBlur(e)}} onFocus={handleFocus} >
            <input className={styles.search} placeholder="Поиск..." value={value} onChange={e => {handleChange(e)}} ></input>
            <div className={styles.result} style={{display: display}}>
                {value != null ? catData.map(item => (
                    item.parent != 0 ? (<Link href={`/catalog/${item.id}`}>
                            
                    <a className={styles.result__item} onClick={handleClick}>
                        <div className={styles.result__cat_item_title}>
                            {item.name}
                        </div>
                    </a>
                    
                    </Link>) : null
                )) : null}
                {value != null ? data.map(item => (
                    
                    <Link href={`/product/${item.id}`}>
                            
                    <a className={styles.result__item} onClick={handleClick}>
                        <div className={styles.result__item_title}>
                            {item.name}
                        </div>
                        <div className={styles.result__item_price}>
                            {item.price} ₽
                        </div>
                    </a>
                    
                    </Link>
                )) : null}
                
            </div>
        </div>
    )
})

export default Search