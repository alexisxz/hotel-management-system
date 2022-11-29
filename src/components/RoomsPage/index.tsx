import { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import { useAppSelector } from '../../app/hook'
import RoomCard from './RoomCard'
import { Room } from '../../types/Room'

export const initialFiltersState = {
    roomName: '',
    available: 'Any',
    maxGuests: 0,
    singleBeds: 0,
    coupleBeds: 0
}

const RoomsPage = () => {
    const rooms = useAppSelector(state => state.rooms)
    const [getRooms, setGetRooms] = useState<Room[]>(rooms)
    const [filters, setFilters] = useState(initialFiltersState)

    const handleOnChangeFilter = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
    }

    useEffect(() => {
        const newArray = rooms.filter(room =>
            room.coupleBeds >= filters.coupleBeds
            && room.singleBeds >= filters.singleBeds
            && room.maxGuests >= filters.maxGuests
            && room.roomName.includes(filters.roomName))

        if (filters.available === 'Any') return setGetRooms(newArray)
        if (filters.available === 'Available') return setGetRooms(newArray.filter(room => room.available === true))
        if (filters.available === 'Occupied') return setGetRooms(newArray.filter(room => room.available === false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    useEffect(() => {
        setGetRooms(rooms)
    }, [rooms])

    return (
        <div className={styles.container}>
            <header>
                <h2>Rooms</h2>
                <Link href='/rooms/create-room'>Create Room</Link>
            </header>
            <div>
                {/* Filter */}
                <div className={styles.roomFilter}>
                    <h3>Filter By</h3>
                    <div className={styles.filterWrapper}>
                        <div>
                            <label>Availability:</label>
                            <select name='available' value={filters.available} onChange={handleOnChangeFilter}>
                                <option value="Any">Any</option>
                                <option value="Available">Available</option>
                                <option value="Occupied">Occupied</option>
                            </select>
                        </div>
                        <div>
                            <label>Room name:</label>
                            <input type="text" style={{ width: 150 }} name='roomName' value={filters.roomName} onChange={e => handleOnChangeFilter(e)} />
                        </div>
                        <div>
                            <label>Max. guests:</label>
                            <input type="number" style={{ width: 50 }} name='maxGuests' value={filters.maxGuests} onChange={e => handleOnChangeFilter(e)} />
                        </div>
                        <div>
                            <label>Min. of single beds:</label>
                            <input type="number" style={{ width: 50 }} name='singleBeds' value={filters.singleBeds} onChange={e => handleOnChangeFilter(e)} />
                        </div>
                        <div>
                            <label>Min. of couple beds:</label>
                            <input type="number" style={{ width: 50 }} name='coupleBeds' value={filters.coupleBeds} onChange={e => handleOnChangeFilter(e)} />
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.roomsGrid}>
                {getRooms.map(room => (
                    <RoomCard key={room.id} room={room} setFilters={setFilters} />
                ))}
            </div>
        </div>
    )
}

export default RoomsPage