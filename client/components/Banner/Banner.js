import Image from 'next/image'
import styles from './Banner.module.css';
export default function Banner () {
    return (
        <div className={styles.banner}>
            <Image
                src="/banner/banner.jpg"
                alt="Banner"
                layout="responsive"
                width={1950}
                height={760}
            />
        </div>
    )
}