import { CompartmentType } from "./enum";
import { Seat } from "./seat";

export class Compartment {
    compartmentId: number;
    compartmentType: CompartmentType;
    seats: Seat[];

    constructor(params: {
        compartmentId: number;
        compartmentType: CompartmentType;
        seats: Seat[];
    }) {
        this.compartmentId = params.compartmentId;
        this.compartmentType = params.compartmentType;
        this.seats = params.seats;
    }

    getCompartment(): Compartment {
        return this;
    }
}