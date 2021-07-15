import styles from './Cabinet.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react';


const Busket = observer(() => {

   
    return (
        <>
        <div className={styles.busket}>
            <div className={styles.busket_info}>
                <h1>Личный кабинет</h1>
                <div className={styles.busket_items}>
                    
                    
                </div>
            </div>
        </div>
        </>
    )
}) 
export default Busket