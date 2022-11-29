import { Guest } from "./Guest"

export type Room = {
    id: string,
    roomName: string,
    guest?: Guest,
    description: string,
    singleBeds: number,
    coupleBeds: number,
    maxGuests: number,
    available: boolean
}