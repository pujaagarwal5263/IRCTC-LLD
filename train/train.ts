import { Compartment } from "./compartment";

class Train {
    trainId: number;
    trainName: string;
    trainNumber: number;
    stations: string[];
    arrivalTimes: string[];
    departureTimes: string[];
    compartments: Compartment[];

    constructor(params: {
        trainId: number;
        trainName: string;
        trainNumber: number;
        stations: string[];
        arrivalTimes: string[];
        departureTimes: string[];
        compartments: Compartment[];
    }) {
        this.trainId = params.trainId;
        this.trainName = params.trainName;
        this.trainNumber = params.trainNumber;
        this.stations = params.stations;
        this.arrivalTimes = params.arrivalTimes;
        this.departureTimes = params.departureTimes;
        this.compartments = params.compartments;
    }

    getTrain(): Train {
        return this;
    }
}