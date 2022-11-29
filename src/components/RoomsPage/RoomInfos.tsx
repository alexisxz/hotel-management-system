import styles from '../../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import { Room } from '../../types/Room'
import GuestForm from './GuestForm'
import { useAppDispatch } from '../../app/hook'
import { updateRoom } from '../../features/roomsSlice'
import { useRouter } from 'next/router'

type Props = {
    selectedRoom: Room
}

function RoomInfos({ selectedRoom }: Props) {
    const dispatch = useAppDispatch()

    const [getRoom, setGetRoom] = useState<Room>({
        id: selectedRoom.id,
        available: selectedRoom.available,
        coupleBeds: selectedRoom.coupleBeds,
        description: selectedRoom.description,
        maxGuests: selectedRoom.maxGuests,
        roomName: selectedRoom.roomName,
        singleBeds: selectedRoom.singleBeds,
        guest: selectedRoom.guest
    })

    useEffect(() => {
        const newMaxGuests = Number(getRoom.coupleBeds) * 2 + Number(getRoom.singleBeds)
        setGetRoom({ ...getRoom, maxGuests: newMaxGuests })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getRoom.coupleBeds, getRoom.singleBeds])

    const handleOnChange = (event: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setGetRoom({ ...getRoom, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleOnClick = () => {
        dispatch(updateRoom({ updatedRoom: getRoom }))
    }

    return (
        <div>
            <h2>{selectedRoom.roomName}</h2>
            <div className={styles.roomForm}>
                <div>
                    <label>Room name: </label>
                    <input type="text" name='roomName' value={getRoom.roomName} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Description: </label>
                    <textarea name='description' value={getRoom.description} onChange={event => setGetRoom({ ...getRoom, description: event.target.value })} cols={100} rows={15} />
                </div>

                <div>
                    <label>Quantity of Single Beds: </label>
                    <input type="number" name='singleBeds' value={getRoom.singleBeds} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Quantity of Couple Beds: </label>
                    <input type="number" name='coupleBeds' value={getRoom.coupleBeds} onChange={event => handleOnChange(event)} />
                </div>
                <button onClick={handleOnClick}>Update</button>

                <GuestForm room={selectedRoom} />
            </div>
        </div>
    )
}

export default RoomInfos