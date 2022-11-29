import styles from '../../styles/Home.module.scss'
import CreateRoomForm from '../../components/RoomsPage/CreateRoomForm'
import Head from 'next/head'

export default function createRooms() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hotel Management System</title>
                <meta name="description" content="By Alexis Matos da Sivla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CreateRoomForm />


        </div>
    )
}
