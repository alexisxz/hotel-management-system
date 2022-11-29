export type Guest = {
    guestDocumentId: string,
    guestName: string,
    roomId: string,
    checkInDate: Date | string,
    checkOutDate: Date | string,
    nights: number
}