import { useRouter } from 'next/router'
import { initialFiltersState } from '.'
import { useAppDispatch } from '../../app/hook'
import { removeRoom } from '../../features/roomsSlice'
import styles from '../../styles/Home.module.scss'
import { Room } from '../../types/Room'

type Props = {
    room: Room;
    setFilters: (value: any) => void,
}

function RoomCard({ room, setFilters }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleOnDelete = () => {
        dispatch(removeRoom({ roomId: room.id }))
        setFilters(initialFiltersState)
    }

    const handleOnSelect = () => {
        router.push('/rooms/' + room.id)
    }

    return (
        <div className={styles.roomCard}>
            <h3>{room.roomName}</h3>
            <h5>{room.available ? 'Available' : 'Occupied'}</h5>
            <p>Max. Guests: {room.maxGuests}</p>
            <div>
                <button onClick={handleOnSelect}>Select</button>
                <button onClick={handleOnDelete}>Delete</button>
            </div>
        </div>
    )
}

export default RoomCard