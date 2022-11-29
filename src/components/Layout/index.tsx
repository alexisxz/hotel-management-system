import styles from '../../styles/Home.module.scss'
import Footer from './Footer'
import SideBar from './SideBar'

type Props = {
    children: JSX.Element[] | JSX.Element
}

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.layout}>
            <SideBar />
            <main className={styles.main}>
                {children}
                <Footer />
            </main>
        </div>
    )
}

export default Layout