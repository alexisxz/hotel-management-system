import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid'
import { Guest } from '../types/Guest'
import { Room } from '../types/Room'

type State = Room[]

const initialState: State = [
    { id: v4(), roomName: 'Londres', description: 'Feel like in londres', maxGuests: 10, coupleBeds: 2, singleBeds: 6, available: true },
    { id: v4(), roomName: 'Brazil', description: 'Tropical', maxGuests: 4, coupleBeds: 1, singleBeds: 2, available: true },
]

export const roomsSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<{ newRoom: Room }>) => {
            const newRoom = action.payload.newRoom;
            if (!newRoom.roomName) return state;

            return [...state, newRoom]
        },

        removeRoom: (state, action: PayloadAction<{ roomId: string }>) => {
            const roomId = action.payload.roomId;
            if (!roomId) return state;

            const newState = state.filter(room => room.id !== roomId)
            return newState
        },

        updateRoom: (state, action: PayloadAction<{ updatedRoom: Room }>) => {
            const updatedRoom = action.payload.updatedRoom;
            if (!updatedRoom) return state;

            if (!state.find(room => room.id === updatedRoom.id)) return state

            const newState = [...state.filter(room => room.id !== updatedRoom.id), updatedRoom];
            return newState
        },

        addGuestRoom: (state, action: PayloadAction<{ newGuest: Guest, roomId: string }>) => {
            const newGuest = action.payload.newGuest

            const roomId = action.payload.roomId
            if (!roomId) return state;

            const room = state.find(room => room.id === roomId)
            if (!room) return state;

            let roomAvailability = false;
            if (newGuest.guestName === '') {
                roomAvailability = true
            }

            const newGuestRoom = { ...room, guest: newGuest, available: roomAvailability }

            const newState = [...state.filter(room => room.id !== roomId), newGuestRoom];
            return newState
        }
    },
})

export default roomsSlice.reducer
export const { addRoom, removeRoom, updateRoom, addGuestRoom } = roomsSlice.actions