import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import styles from '../../styles/Home.module.scss'
import { Guest } from '../../types/Guest'
import { addGuestRoom } from '../../features/roomsSlice'
import { useRouter } from 'next/router'

const BookForm = () => {
    const rooms = useAppSelector(state => state.rooms)
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [newGuest, setNewGuest] = useState<Guest>({
        roomId: '',
        guestName: '',
        checkInDate: '',
        checkOutDate: '',
        guestDocumentId: '',
        nights: 0
    })

    //handles
    const handleOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setNewGuest({ ...newGuest, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleOnClick = () => {
        dispatch(addGuestRoom({ newGuest: newGuest, roomId: newGuest.roomId }))
        router.replace('/guests')
    }

    return (
        <div>
            <h3>Book new guest</h3>
            <div className={styles.roomForm}>
                <div>
                    <label>Select Room: </label>
                    <select name='roomId' value={newGuest.roomId} onChange={handleOnChange}>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.roomName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Guest name: </label>
                    <input type="text" name='guestName' value={newGuest.guestName} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Guest document ID: </label>
                    <input type="text" name='guestDocumentId' value={newGuest.guestDocumentId} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>CheckIn: </label>
                    <input type="date" name='checkInDate' value={newGuest.checkInDate.toString()} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>CheckOut: </label>
                    <input type="date" name='checkOutDate' value={newGuest.checkOutDate.toString()} onChange={event => handleOnChange(event)} />
                </div>

                <button onClick={handleOnClick}>Book</button>
            </div>
        </div>
    )
}

export default BookForm