//model booking class

export interface Booking {
    BookingId: number;
    DateTime: string;
    Seats: number;
    TransactionId: number;
    UserEmail: string;
    VehicleId: number;
}