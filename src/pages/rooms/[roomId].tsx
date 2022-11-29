import styles from '../../styles/Home.module.scss'
import CreateRoomForm from '../../components/RoomsPage/CreateRoomForm'
import Head from 'next/head'
import { useAppSelector } from '../../app/hook'
import { useRouter } from 'next/router';
import RoomInfos from '../../components/RoomsPage/RoomInfos';

export default function RoomId() {
    const router = useRouter();

    const selectedRoom = useAppSelector(state => state.rooms).find(item => item.id === router.query.roomId)

    return (
        <div className={styles.container}>
            <Head>
                <title>Hotel Management System</title>
                <meta name="description" content="By Alexis Matos da Sivla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {selectedRoom ? <RoomInfos selectedRoom={selectedRoom} /> : <div>The room was not found</div>}

        </div>
    )
}
