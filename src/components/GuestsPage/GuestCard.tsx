import Link from 'next/link'
import { useAppSelector } from '../../app/hook'
import styles from '../../styles/Home.module.scss'
import { Guest } from '../../types/Guest'

type Props = {
    guest: Guest | undefined
}

export default function GuestCard({ guest }: Props) {
    const room = useAppSelector(state => state.rooms).find(item => item.id === guest?.roomId)

    return (
        <div className={styles.guestCard}>
            <h3>Guest: {guest?.guestName}</h3>
            <p>Room: {room?.roomName}</p>
            <Link href={'/rooms/' + guest?.roomId}>Select Room</Link>
        </div>
    )
}