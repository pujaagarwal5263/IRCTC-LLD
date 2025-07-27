import { SeatType } from "./enum";

export class Seat {
    seatId: number;
    seatNumber: number;
    seatType: SeatType;
    isAvailable: boolean;

    constructor(params: {
        seatId: number;
        seatNumber: number;
        seatType: SeatType;
        isAvailable: boolean;
    }) {
        this.seatId = params.seatId;
        this.seatNumber = params.seatNumber;
        this.seatType = params.seatType;
        this.isAvailable = params.isAvailable;
    }

    getSeat(): Seat {
        return this;
    }
}