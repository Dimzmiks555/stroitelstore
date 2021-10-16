import { Paper, List, ListItem, ListItemText, ListItemButton, TextField, Autocomplete, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Layout from "../components/Layout";
import HOST from "../HOST";
import styles from './login.module.css'

 export default function Login() {

    const [optConsumer, setOptConsumer] = useState([])
    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('')

    useEffect(() => {   
        fetch(`http://${HOST.host}/api/users/`)
        .then(res => res.json())
        .then(json => {
            // setData(json)
            console.log(json)

            let optConsumers = json?.filter(itm => (itm?.surname))?.map(item => {
                
                return {
                    label: `${item.surname} ${item?.name}`,
                    phone: item.phone
                }

            })

            setOptConsumer(optConsumers)


        })
    }, [])


    function handleLogin(e) {

    setLoading(true)
    setMessage('')
    let data = {
        phone: login,
        password: password
    }

    fetch(`http://${HOST.host}/api/login`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => {return res.json()})
    .then(json => {
        console.log(json)
        console.log(json.token)
        if (json.token.message) {
            setMessage(json.token.message)
            setLoading(false)
        }
        if (!json.token.message && json.token) {
            localStorage.setItem('token', json.token)
            setLoading(false)
            window.location.href = '/'
        }
    })
    .catch(err => console.log(err))

    }

     return (
        <div className={styles.login}>
            <Paper variant='outlined' sx={{p:8, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div className={styles.logo}>
                    <img src='/sidebar/LOGO.svg'></img>
                </div>
                <div className={styles.select}>
                    <Autocomplete
                    disablePortal
                    onChange={(e, newValue) => {setLogin(newValue.phone)}}
                    id="combo-box-demo"
                    options={optConsumer}
                    sx={{ width: 300, mt: 4 }}
                    renderInput={(params) => <TextField {...params} label="Пользователь" />}
                    />
                </div>
                <div className={styles.password}>
                    <TextField type='password' label='Пароль' sx={{ width: 300, mt: 3 }} onChange={e => {setPassword(e.target.value)}}></TextField>
                </div>
                <div className={styles.button} >
                    <Button variant='contained' onClick={handleLogin} size='large' label="Войти" sx={{ width: 300, mt: 3, p:2 }}>Войти</Button>
                </div>
            </Paper>
        </div>
    )
 }