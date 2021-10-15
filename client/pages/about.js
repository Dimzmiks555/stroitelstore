import Header from '../components/Header/Header';
import Mainstyles from './index.module.css';
import styles from './contacts.module.css';
import Catalog from "../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import Footer from '../components/Footer/Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const About = observer(() => {

  return (
    <>
    <Head>
      <title>СТРОИТЕЛЬ - О магазине</title>
      <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
      <meta name='keywords' content="магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин  "></meta>
    </Head>
    
    <Catalog />
    <Header />
    <div className={Mainstyles.page}>

        

        <div className={styles.about}>

            <div>
                <h1>
                    О магазине
                </h1>
                <Carousel
                        additionalTransfrom={0}
                        autoPlay
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container"
                        customLeftArrow={<div />}
                        customRightArrow={<div />}
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 2
                            },
                            mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1
                            },
                            tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1
                            }
                        }}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                        >
                        {
                          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(number => (
                            <img
                            src={`/about/${number}.jpeg`}
                            style={{
                            display: 'block',
                            height: '420px',
                            margin: 'auto',
                            width: '100%'
                            }}
                        />
                          ))
                        }
                </Carousel>
                <h3>
                Компания «Строитель» реализует строительные и отделочные материалы от ведущих российских и зарубежных производителей.

                На всю продукцию имеются соответствующие сертификаты качества, санитарно-эпидемиологические заключения, сертификаты пожарной безопасности. Наша компания гарантирует безупречное качество строительных материалов, высокий уровень обслуживания, индивидуальный подход к каждому клиенту.

                Обратившись к нашим менеджерам по телефону, Вы сможете получить консультацию по всем интересующим Вас вопросам. Мы поможем Вам рассчитать необходимое количество материалов, подберем строительно-отделочные материалы, оптимально сочетающие в себе приемлемую цену и высокое качество, обеспечим поставку материалов на объект.

                Мы приглашаем к сотрудничеству новые компании на постоянной договорной основе и взаимовыгодных условиях.

                Мы будем рады видеть Вас в числе наших клиентов!
                </h3>
                
            </div>

        </div>

    </div>
    <Footer />
    <MobileMenu></MobileMenu>
    </>
  )

});
export default About