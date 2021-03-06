import { useEffect, useState } from 'react'
import HOST from '../HOST'
import styles from './Header.module.css'
import HeaderStore from './HeaderStore'
import decode from 'jwt-decode'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function Header({title}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            
            let token = localStorage.getItem('token')
                
                console.log(token)

            if (localStorage.getItem('token') != null) {
                let token = localStorage.getItem('token')
                
                console.log(token)

                fetch(`http://${HOST.host}/api/auth`,{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then(res => res.json())
                .then(json => {

                    if (json.token) {
                        HeaderStore.setAuth(true)
                        HeaderStore.setUserData(decode(json.token))
                        
                    } 

                })
                 
            } else {
                console.log('CHO')
                window.location.href = '/login'
            }
        }
    }, [HeaderStore.userData.email]) 


    function handleLogout(e) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }


    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={`??????????????`}>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{HeaderStore.userData?.name?.[0]}</Avatar>
                </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar>{HeaderStore.userData?.name?.[0]}</Avatar>{HeaderStore.userData?.surname} {HeaderStore.userData?.name}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    ??????????????????
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    ??????????
                </MenuItem>
            </Menu>
        </div>
    )
}