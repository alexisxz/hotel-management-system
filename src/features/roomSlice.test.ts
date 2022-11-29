import { useAppDispatch, useAppSelector } from "../app/hook";
import { Room } from "../types/Room";
import roomReducer, { addRoom, addGuestRoom, removeRoom, updateRoom } from './roomsSlice'
import { PayloadAction } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { Guest } from "../types/Guest";


// addRoom action
it('Should add a room', () => {
    //Arrange
    const newRoom: Room = { id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }
    const initialState: Room[] = [];
    const action = addRoom({ newRoom: newRoom })

    //Act
    const result = roomReducer(initialState, action)

    //Assert
    expect(result).toHaveLength(1)
    expect(result[1]).not.toBeDefined()
    expect(result[0].roomName).toBe(newRoom.roomName)
})

it('should not add a room - empty roomName', () => {
    // Assange
    const newRoom: Room = { id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: '' }
    const initialState: Room[] = [];
    const action = addRoom({ newRoom: newRoom })

    //Act
    const result = roomReducer(initialState, action)

    //Assert
    expect(result).toHaveLength(0)
    expect(result[0]).not.toBeDefined()
})

// removeRoom action
it('should remove a room', () => {
    // Assange
    const roomId: string = '123';
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = removeRoom({ roomId: roomId })

    //Act
    const result = roomReducer(initialState, action)

    //Assert
    expect(result).toHaveLength(0)
    expect(result[0]).not.toBeDefined()
})

it('should not remove a room - wrong id', () => {
    // Assange
    const roomId: string = '234'
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = removeRoom({ roomId: roomId })

    //Act
    const result = roomReducer(initialState, action)

    //Assert
    expect(result).toHaveLength(1)
    expect(result[0]).toBeDefined()
    expect(result[0].roomName).toBe('Ghana')
})

// updateRoom action
it('should update the room', () => {
    // Assange
    const updatedRoom: Room = { id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Nigeria' }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = updateRoom({ updatedRoom: updatedRoom })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].roomName).toBe(updatedRoom.roomName);
    expect(result[0]).toBeDefined
})

it('should not update the room', () => {
    const updatedRoom: Room = { id: '234', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Nigeria' }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = updateRoom({ updatedRoom: updatedRoom })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].roomName).not.toBe(updatedRoom.roomName);
    expect(result[0].roomName).toBe('Ghana')
    expect(result[0]).toBeDefined
})

// addGuestRoom action
it('should add a guest to the room', () => {
    // Assange
    const roomId: string = '123'
    const newGuest: Guest = { roomId: '123', checkInDate: '', checkOutDate: '', guestDocumentId: 'abc', guestName: 'Franz', nights: 0 }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = addGuestRoom({ newGuest: newGuest, roomId: roomId })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].available).toBe(false);
    expect(result[0].guest?.roomId).toBe(roomId);
    expect(result[0].guest?.guestName).toBe('Franz');
})

it('should not add a guest to the room - roomId not found', () => {
    // Assange
    const roomId: string = '234'
    const newGuest: Guest = { roomId: '123', checkInDate: '', checkOutDate: '', guestDocumentId: 'abc', guestName: 'Franz', nights: 0 }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = addGuestRoom({ newGuest: newGuest, roomId: roomId })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].available).toBe(true);
    expect(result[0].guest?.roomId).not.toBe(roomId);
    expect(result[0].guest?.guestName).not.toBeDefined();
})

it('should not add a guest to the room - newGuest roomId not found', () => {
    // Assange
    const roomId: string = ''
    const newGuest: Guest = { roomId: '234', checkInDate: '', checkOutDate: '', guestDocumentId: 'abc', guestName: 'Franz', nights: 0 }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana' }]
    const action = addGuestRoom({ newGuest: newGuest, roomId: roomId })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].available).toBe(true);
    expect(result[0].guest?.roomId).not.toBe(roomId);
    expect(result[0].guest?.guestName).not.toBeDefined();
})

it('should reset the guest of the room', () => {
    const roomId: string = '123'
    const resetGuest: Guest = { roomId: '', checkInDate: '', checkOutDate: '', guestDocumentId: '', guestName: '', nights: 0 }
    const guest: Guest = { roomId: '123', checkInDate: '', checkOutDate: '', guestDocumentId: 'abc', guestName: 'Franz', nights: 0 }
    const initialState: Room[] = [{ id: '123', available: true, coupleBeds: 2, singleBeds: 2, description: '', maxGuests: 1, roomName: 'Ghana', guest: guest }]
    const action = addGuestRoom({ newGuest: resetGuest, roomId: roomId })

    //Act
    const result = roomReducer(initialState, action);

    //Assert
    expect(result).toHaveLength(1);
    expect(result[0].guest).toBe(resetGuest);
    expect(result[0].guest?.roomId && result[0].guest?.guestName && result[0].guest?.guestDocumentId).toBe('')
})
