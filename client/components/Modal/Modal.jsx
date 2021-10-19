import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import HOST from "../../HOST"
import styles from "./Modal.module.css"
import ModalStore from "./ModalStore"


const Modal = observer(() => {

    const [good, setGood] = useState({})
    const [success, setSuccess] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setName('')
        setPhone('')
        setSurname('')
        setSuccess(false)
        fetch(`${HOST.host}/api/products/${ModalStore.good}`)
        .then(res => res.json())
        .then(json => {
            setGood(json[0])
            console.log(json[0])
        })
    }, [ModalStore.good])

    function handleSubmit(e) {
        e.preventDefault()

        let mailData = {
            to: 'anodaday@yandex.ru',
            subject: 'Новый запрос на товар!',
            text: `Необходим запрос на товар ${good?.title} Артикул:  ${good?.prices_and_count?.sku} 
                    Номер: ${phone} Имя: ${name} Фамилия: ${surname}`
        }


        fetch(`${HOST.host}/api/mail`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(mailData)
        })
        .then(res => res.json())
        .then(json => {
            setSuccess(true)
        })


    }

    function handleInput(e) {


        if(e.target.id == 'tel') {
            setPhone(e.target.value)
        } else if(e.target.id == 'name') {
            setName(e.target.value)
        } else if(e.target.id == 'surname') {
            setSurname(e.target.value)
        } 


    }

    return (
        <div className={styles.modal__wrapper} style={ModalStore.isOpen ? {display: 'flex'} : {display: 'none'}} >
            <div className={styles.modal__block}>
                <div className={styles.close} onClick={e => ModalStore.setIsOpen(false)}>
                    ✖
                </div>
                <h2>Отправить запрос на товар</h2>
                
                <div className={styles.good}>
                    <div className={styles.good__img}>
                        <img alt={good?.title} src={`${HOST.host}/uploads/${good?.images?.length > 0 ? good?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                    </div>
                    <div className={styles.good__title}>
                        {good?.title}
                    </div>
                </div>
                <p>Товара на данный момент нет в наличии, но вы можете отправить заявку менеджеру для уточнения цены и сроков доставки.</p>
                <form>
                    <div className={styles.form__header}>
                        <div>
                            <label>
                                Имя
                            </label>
                            <input id='name' onChange={handleInput}></input>
                        </div>
                        <div>
                            <label>
                                Фамилия
                            </label>
                            <input id='surname' onChange={handleInput}></input>
                        </div>
                    </div>
                    <div className={styles.form__body}>
                        <label>
                            Номер телефона
                        </label>
                        <input id='tel' onChange={handleInput}></input>
                    </div>
                    <div className={styles.form__footer}>
                        {
                            !success &&
                            phone != '' &&
                            name != '' &&
                            surname != ''  ? (
                                <button onClick={handleSubmit}>
                                    Отправить
                                </button>
                            ) : !success &&
                            phone == '' &&
                            name == '' &&
                            surname == ''  ? (
                               <button disabled style={{background: '#ccc'}}>
                                   Отправить
                               </button>
                           ) : (
                                <p style={{color: '#080'}}>Запрос успешно отправлен</p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )


})


export default Modal