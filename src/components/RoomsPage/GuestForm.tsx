import styles from '../../styles/Home.module.scss'
import { useState } from 'react'
import { Room } from '../../types/Room'
import { Guest } from '../../types/Guest'
import { useAppDispatch } from '../../app/hook'
import { addGuestRoom } from '../../features/roomsSlice'

type Props = {
    room: Room
}


function GuestForm({ room }: Props) {
    const dispatch = useAppDispatch()
    const initialState = {
        guestDocumentId: room.guest?.guestDocumentId || '',
        roomId: room.id || '',
        checkInDate: room.guest?.checkInDate || '',
        checkOutDate: room.guest?.checkOutDate || '',
        guestName: room.guest?.guestName || '',
        nights: room.guest?.nights || 0,
    }

    const [guestRoom, setGuestRoom] = useState<Guest>({ ...initialState })

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setGuestRoom({ ...guestRoom, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleOnClick = () => {
        const guestNights = (new Date(guestRoom.checkOutDate).getTime() - new Date(guestRoom.checkOutDate).getTime()) / (1000 * 3600 * 24)
        setGuestRoom({ ...guestRoom, nights: guestNights })

        dispatch(addGuestRoom({ newGuest: guestRoom, roomId: room.id }))
    }

    const handleOnCloseClick = () => {
        const resetGuest = {
            guestDocumentId: '',
            roomId: '',
            checkInDate: '',
            checkOutDate: '',
            guestName: '',
            nights: 0
        }
        dispatch(addGuestRoom({ newGuest: resetGuest, roomId: room.id }))
        setGuestRoom(resetGuest)
    }

    return (
        <div>
            <h3>Guest</h3>
            <div className={styles.roomForm}>
                <div>
                    <label>Guest name: </label>
                    <input type="text" name='guestName' value={guestRoom.guestName} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Guest document ID: </label>
                    <input type="text" name='guestDocumentId' value={guestRoom.guestDocumentId} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>CheckIn: </label>
                    <input type="date" name='checkInDate' value={guestRoom.checkInDate.toString()} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>CheckOut: </label>
                    <input type="date" name='checkOutDate' value={guestRoom.checkOutDate.toString()} onChange={event => handleOnChange(event)} />
                </div>

                <button onClick={handleOnClick}>Book</button>
                <button onClick={handleOnCloseClick}>Close guest diary</button>
            </div>
        </div>
    )
}

export default GuestForm