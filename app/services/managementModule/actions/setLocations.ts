class SetLocations implements IAction {
    question: Question;
    target: Question;
    airportsCode: any;
    locations: Array<string>;
    questId: number;

    constructor(questions: Array<Question>, targets: Array<Question>) {
        this.question = questions[0];
        this.target = targets[0];
        this.locations = [];
    }

    run = (): void => {
        this.locations = [];

        this.airportsCode = this.question.properties.airportsCode;
        _.each(this.question.answers, (ans: string) => {
            var depAirportCode = this.airportsCode[ans];
            var locationBuilded = this.target.id + "_" + depAirportCode;
            _.unique
            this.locations.push(locationBuilded);
        });

        this.target.locations = this.locations;
    }
}