import styles from './Loader.module.scss'


const Loader = ({ message }) => {
  
    return (
      <div className={styles.loader_container}>
        <div className={styles.loader} />
        <span className={styles.loading_text}>
          {/* {message ? message : "Loading..."} */}
        </span>
      </div>
    )
  }


  export default Loader