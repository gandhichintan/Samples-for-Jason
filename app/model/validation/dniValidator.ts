class DniValidator {
    private isChar = (item: string): boolean => item.match(/([A-Z])/i) !== null;

    private isNumber = (item: string): boolean => !_.isNaN(Number(item));

    public run = (answer: string): boolean => {
        let isCorrect: boolean = false,
            oneCharFormat: boolean = answer.length === 9,
            twoCharFormat: boolean = answer.length === 10;

        if (oneCharFormat) {
            let numbers = answer.substring(0, 8),
                char = answer.substring(8);
            isCorrect = this.isNumber(numbers) && this.isChar(char);
        }

        if (twoCharFormat) {
            let firstChar = answer.substring(0, 1),
                numbers = answer.substring(1, 9),
                lastChar = answer.substring(9);
            isCorrect = this.isChar(firstChar) && this.isNumber(numbers) && this.isChar(lastChar);
        }

        return isCorrect;
    };
}