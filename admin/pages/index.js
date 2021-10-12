import { Paper, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Layout from "../components/Layout";
import HOST from "../HOST";

 export default function Home() {

    const [hits, setHits] = useState({})


    useEffect(() => {   
        fetch(`http://${HOST.host}/api/hits`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setHits(json)
        })
    }, [])

     return (
         <Layout title='Главная'>
             <Paper sx={{p:4,pt: 1, width: '50%'}} variant='outlined'>
                <h2>Хиты</h2>
                <List>
                    {
                        hits?.rows?.map(item => (
                            <ListItem disablePadding>
                                <Link href={`/products/${item.guid}`}>
                                    <ListItemButton>
                                        <ListItemText>
                                            {item?.title}
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
             </Paper>
         </Layout>
     )
 }