import styles from './Search.module.css';
import CatalogStore from "../CatalogStore";
import {observer} from "mobx-react";
import {useState, useEffect} from 'react'
import Link from 'next/link';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useRouter } from 'next/router';

const Search = observer(() => {
    const router = useRouter()
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
                setDisplay('block');
                setValue(null)
            }
        }
        setDisplay('block');
        Set()
    }
    function handleFocus(e) {
            if (value != '' && value != null) {
                setDisplay('block');
            }
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
    function handleSearchPage(e) {
        router.push(`/search/${value}/1`)
    }
     
            
    useEffect(() => {
        setLoading(true)
        async function getData(text){


            if (text == '' || text == null) {
                setData([])
            } else {
                
                fetch(`http://localhost:80/api/products?search=${text}`)
                .then(res => res.json())
                .then(json => setData(json))

                }
                
            }
            
            
        
        if (value != '' && value?.length > 1) {
            getData(value);
        } else {
            setData([])
            // setCatData([])
        }


    }, [value]);

    return (
        <div className={styles.search__box} onBlur={e => {handleBlur(e)}} >
            <div className={styles.search__tool} onFocus={handleFocus} >
                <input className={styles.search} placeholder="Поиск..." value={value} onChange={e => {handleChange(e)}} ></input>
                <button onClick={e => handleSearchPage(e)}>Найти</button>
            </div>
            <div className={styles.result} style={{display: display}}>
                {value != null ? catData.map(item => (
                    item.parent != 0 ? (<Link href={`/catalog/${item.guid}`}>
                            
                    <a className={styles.result__item} onClick={handleClick}>
                        <div className={styles.result__cat_item_title}>
                            {item.name}
                        </div>
                    </a>
                    
                    </Link>) : null
                )) : null}
                {value != null ? data?.rows?.map(item => (
                    
                    <Link href={`/product/${item.guid}`}>
                            
                    <a className={styles.result__item} onClick={handleClick}>
                        <div className={styles.result__item_title}>
                            {item.title}
                        </div>
                        <div className={styles.result__item_price}>
                            {item?.prices_and_count?.price} ₽
                        </div>
                    </a>
                    
                    </Link>
                )) : null}
                
            </div>
        </div>
    )
})

export default Search