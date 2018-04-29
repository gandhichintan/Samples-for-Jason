interface IMetadata {
    buyChannel?: string;
    ckiChannel?: string;
    email?: string;
    flights: Array<IFlightInfo>;
    passenger: IPassengerInfo;
    pnr?: string;
    pnrTest?: string;
}

interface IFlightInfo {
    airlineMkt?: string;
    airlineOp: string;
    airport: IAirport;
    arrTime?: string;
    arrTimeGMT?: string;
    arrTimeGMTReal?: string;
    arrTimeReal?: string;
    boardingName?: string;
    cabin?: string;
    depTime?: string;
    depTimeGMT?: string;
    depTimeGMTReal?: string;
    depTimeReal?: string;
    flightDate: string;
    flightDateGMT?: string;
    flightNumber?: string;
    haul?: string;
    plane?: any;
}

interface IAirport {
    arrAirportCode: string;
    arrAirportName: string;
    depAirportCode: string;
    depAirportName: string;
}

interface IPassengerInfo {
    FF: string;
    FFType: string;
    bag: string;
    conexMAD: boolean;
    name: string;
    surname: string;
    vipReg: boolean;
}