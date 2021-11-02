import Image from 'next/image'
import styles from './Banner.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Banner () {
    return (
        <div className={styles.banner}>
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
                    items: 1
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
                <img
                    src="/banner/banner.jpg"
                    // layout='fill'
                    
                    style={{
                    display: 'block',
                    height: '100%',
                    margin: 'auto',
                    width: '100%'
                    }}
                />
                <img
                    
                    src="/banner/SZLIFIERKA-PROSTA-750W-6MM-1800-7000-OBR-M-MAKITA-Waga-produktu-z-opakowaniem-jednostkowym-2-35-kg.jpg"
                    style={{
                    display: 'block',
                    height: '100%',
                    margin: 'auto',
                    width: '100%'
                    }}
                />
                <img
                    src="/banner/volkova.jpg"
                    
                    style={{
                    display: 'block',
                    height: '100%',
                    margin: 'auto',
                    width: '100%'
                    }}
                />
                <img
                    src="/banner/78061101fd66d5d8af44e22c0494b6dc.jpg"
                   
                    style={{
                    display: 'block',
                    height: '100%',
                    margin: 'auto',
                    width: '100%'
                    }}
                />
        </Carousel>
            {/* <img
                src="/banner/banner.jpg"
                alt="Banner"
                layout="responsive"
                width={1950}
                height={760}
            /> */}
        </div>
    )
}