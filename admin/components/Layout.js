
import Header from './Header'
import styles from './Layout.module.css'
import Sidebar from './Sidebar'

export default function Layout({children, title}){
    return (
        <div className={styles.layout}>
            <Sidebar></Sidebar>
            <div className={styles.main}>
                <Header title={title}></Header>
                <div className={styles.page}>
                    {children}
                </div>
            </div>
        </div>
    )
}