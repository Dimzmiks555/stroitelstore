import styles from './Hits.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import HOST from '../../HOST';
import Loader from '../Loader/Loader';

export default function Hits () {

    const [data, setData] = useState([]);

    useEffect(() => {
      async function getData(){
          
          await fetch(`${HOST.host}/api/hits`)
          .then(result => result.json())
          .then(json => {
              setData(json.rows)
              console.log(json.rows)
          });

              
      }
      
      getData();
  
  
      
  
  }, []);

    return (
        <div className={styles.newgoods}>
            <h2>
                Хиты
            </h2>
            <div className={styles.newgoods__wrapper} >
                {
                    data.length > 0 ? <Carousel
                    additionalTransfrom={0}
                    // autoPlay
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    customLeftArrow={<div></div>}
                    customRightArrow={<div></div>}
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
                        items: 4
                        },
                        mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 2
                        },
                        tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 3
                        }
                    }}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                    >
                    {data.map(item => (
                        <div className={styles.newgoods__item}>
                            <div>
                                <Link href={`/product/${item.guid}`}>
                                    <div className={styles.good_img}>
                                        <img alt="" src={`${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                    </div>
                                </Link>
                                <Link href={`/product/${item.guid}`}>
                                <div className={styles.good_title}>
                                    {item.title}
                                </div>
                                </Link>
                            </div>
                            <div>
                                <div className={styles.good_price}>
                                    <p>
                                        <span>{(+item.prices_and_count?.price).toLocaleString()}</span> ₽
                                    </p>
                                </div>
                                <Link href={`/product/${item.guid}`}>
                                <a className={styles.to_cart}>
                                    В корзину
                                </a>
                                </Link>
                            </div>
                        </div>
                    
                    ))}
                </Carousel> : <Loader/>
                }
                <div className={styles.newgoods__items} id="newgoods">
                    
                </div>
                
            </div>
            
            {/* <div className={styles.newgoods__control_left} onClick={e => {handleLeftScroll(e)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enableBackground="new 0 0 512.002 512.002"
                version="1.1"
                viewBox="0 0 512.002 512.002"
                xmlSpace="preserve"
                >
                <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
            </svg>
            </div>
            <div className={styles.newgoods__control_right} onClick={e => {handleRightScroll(e)}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enableBackground="new 0 0 512.002 512.002"
                version="1.1"
                viewBox="0 0 512.002 512.002"
                xmlSpace="preserve"
                >
                <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
            </svg>
            </div> */}
            
            
        </div>
    )
}
