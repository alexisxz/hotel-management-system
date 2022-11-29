import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'

const SideBar = () => {

    return (
        <nav className={styles.sideBar}>
            <Link href='/'>Home</Link>
            <Link href='/rooms'>Rooms</Link>
            <Link href='/guests'>Guests</Link>
        </nav>
    )
}

export default SideBar