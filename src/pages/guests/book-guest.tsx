import styles from '../../styles/Home.module.scss'
import Head from 'next/head'
import BookForm from '../../components/GuestsPage/BookForm'

export default function createRooms() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hotel Management System</title>
                <meta name="description" content="By Alexis Matos da Sivla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BookForm />


        </div>
    )
}
