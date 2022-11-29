import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import { useAppSelector } from '../../app/hook'
import GuestCard from './GuestCard'

const GuestsPage = () => {
    const rooms = useAppSelector(state => state.rooms)

    return (
        <div className={styles.container}>
            <header>
                <h2>Guests</h2>
                <Link href='/guests/book-guest'>Book Guest</Link>
            </header>
            <div className={styles.guestsGrid}>
                {rooms.map(room => {
                    if (room.guest?.guestName) return (
                        <GuestCard key={room.guest?.roomId} guest={room.guest} />
                    )
                })}
            </div>
        </div>
    )
}

export default GuestsPage