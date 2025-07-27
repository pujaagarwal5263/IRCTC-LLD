import { SeatType } from "./enum";
import { Train } from "./train";
import { Compartment } from "./compartment";
import { Seat } from "./seat";

export class TrainJourney {
  train: Train;
  journeyId: number;
  journeyDate: Date;
  seatAvailability: Map<string, Seat>; // Map for quick lookup

  constructor(params: { train: Train; journeyDate: Date }) {
    this.train = params.train;
    this.journeyId = Math.floor(Math.random() * 1000000);
    this.journeyDate = params.journeyDate;
    this.seatAvailability = this.initializeSeatAvailability();
  }

  private initializeSeatAvailability(): Map<string, Seat> {
    const seatMap = new Map<string, Seat>();

    this.train.compartments.forEach((compartment) => {
      compartment.seats.forEach((seat) => {
        if (seat.isAvailable) {
          const key = `${compartment.compartmentId}-${seat.seatId}`;
          seatMap.set(key, seat);
        }
      });
    });

    return seatMap;
  }

  getTrainJourney(): TrainJourney {
    return this;
  }

  checkSeatAvailability(seatType: SeatType): boolean {
    // Check if any seat of the given type is available
    for (const seat of this.seatAvailability.values()) {
      if (seat.seatType === seatType) {
        return true;
      }
    }
    return false;
  }

  bookSeat(compartmentId: number, seatType: SeatType): boolean {
    // Find the compartment
    const compartment = this.train.compartments.find(
      (c) => c.compartmentId === compartmentId
    );
    if (!compartment) return false;

    // Find available seat of the specified type in this compartment
    const availableSeat = compartment.seats.find(
      (s) => s.seatType === seatType && s.isAvailable
    );

    if (availableSeat) {
      // Book the seat
      availableSeat.isAvailable = false;

      // Remove from availability map
      const key = `${compartmentId}-${availableSeat.seatId}`;
      this.seatAvailability.delete(key);

      return true;
    }
    return false;
  }

  cancelBooking(compartmentId: number, seatId: number): boolean {
    const compartment = this.train.compartments.find(
      (c) => c.compartmentId === compartmentId
    );
    if (!compartment) return false;

    const seat = compartment.seats.find((s) => s.seatId === seatId);
    if (seat && !seat.isAvailable) {
      seat.isAvailable = true; // ← Mark as available again

      // Add back to availability map
      const key = `${compartmentId}-${seatId}`;
      this.seatAvailability.set(key, seat);

      return true;
    }
    return false;
  }

  isSeatAvailable(compartmentId: number, seatType: SeatType): boolean {
    const compartment = this.train.compartments.find(
      (c) => c.compartmentId === compartmentId
    );
    if (!compartment) return false;

    return compartment.seats.some(
      (s) => s.seatType === seatType && s.isAvailable
    );
  }

  // Additional utility methods for the Map approach
  getAvailableSeatsByType(seatType: SeatType): Seat[] {
    const availableSeats: Seat[] = [];
    for (const seat of this.seatAvailability.values()) {
      if (seat.seatType === seatType) {
        availableSeats.push(seat);
      }
    }
    return availableSeats;
  }

  getAvailableSeatsByCompartment(compartmentId: number): Seat[] {
    const availableSeats: Seat[] = [];
    for (const [key, seat] of this.seatAvailability.entries()) {
      if (key.startsWith(`${compartmentId}-`)) {
        availableSeats.push(seat);
      }
    }
    return availableSeats;
  }

  getTotalAvailableSeats(): number {
    return this.seatAvailability.size;
  }

  // Method to refresh availability (useful for real-time updates)
  refreshAvailability(): void {
    this.seatAvailability.clear();
    this.train.compartments.forEach((compartment) => {
      compartment.seats.forEach((seat) => {
        if (seat.isAvailable) {
          const key = `${compartment.compartmentId}-${seat.seatId}`;
          this.seatAvailability.set(key, seat);
        }
      });
    });
  }
}
