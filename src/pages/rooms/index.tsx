import styles from '../../styles/Home.module.scss'
import RoomsPage from '../../components/RoomsPage'
import Head from 'next/head'

export default function rooms() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hotel Management System</title>
                <meta name="description" content="By Alexis Matos da Sivla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RoomsPage />


        </div>
    )
}
