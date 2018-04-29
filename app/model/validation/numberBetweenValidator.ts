class NumberBetweenValidator {
    max: number;
    min: number;

    constructor(min: number, max: number) {
        this.max = max;
        this.min = min;
    }

    public run = (answers: string): boolean => {
        return answers.length <= this.max
            && answers.length >= this.min
            && !isNaN(Number(answers));
    }
}