import styles from '../../styles/Home.module.scss'
import { useState } from 'react'
import { Room } from '../../types/Room'
import { v4 } from 'uuid'
import { useAppDispatch } from '../../app/hook'
import { addRoom } from '../../features/roomsSlice'
import { useRouter } from 'next/router'

const initialState: Room = {
    id: v4(), roomName: '', available: true, coupleBeds: 0, singleBeds: 0, description: '', maxGuests: 1
}

const CreateRoomForm = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [newRoom, setNewRoom] = useState<Room>(initialState)

    const handleOnChange = (event: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setNewRoom({ ...newRoom, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleOnClick = () => {
        if (!newRoom.roomName || !newRoom.description || !newRoom.coupleBeds && !newRoom.singleBeds) return alert('Fill up all the fields')

        const formNewRoom: Room = {
            id: v4(),
            available: true,
            description: newRoom.description,
            coupleBeds: newRoom.coupleBeds,
            maxGuests: Number(newRoom.coupleBeds * 2) + Number(newRoom.singleBeds),
            roomName: newRoom.roomName,
            singleBeds: newRoom.singleBeds
        }
        dispatch(addRoom({ newRoom: formNewRoom }))
        setNewRoom(initialState)
        router.replace('/rooms')
    }

    return (
        <div>
            <h2>Create new Room</h2>
            <div className={styles.roomForm}>
                <div>
                    <label>Room name: </label>
                    <input type="text" name='roomName' value={newRoom.roomName} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Description: </label>
                    <textarea name='description' value={newRoom.description} onChange={event => setNewRoom({ ...newRoom, description: event.target.value })} cols={100} rows={15} />
                </div>

                <div>
                    <label>Quantity of Single Beds: </label>
                    <input type="number" name='singleBeds' value={newRoom.singleBeds} onChange={event => handleOnChange(event)} />
                </div>

                <div>
                    <label>Quantity of Couple Beds: </label>
                    <input type="number" name='coupleBeds' value={newRoom.coupleBeds} onChange={event => handleOnChange(event)} />
                </div>
                <button onClick={handleOnClick}>Create</button>
            </div>
        </div>
    )
}

export default CreateRoomForm