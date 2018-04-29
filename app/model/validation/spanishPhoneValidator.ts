class SpanishPhoneValidator implements IValidator {
    private static allowedInitialNumbers: Array<number> = [6, 7, 9];
    private static dimension: number = 9;

    public run = (answer: string): boolean => {
        if (isNaN(Number(answer))) {
            return false;
        }

        const firstNumber: number = Number(answer.charAt(0));

        return answer.length === SpanishPhoneValidator.dimension
            && _.contains(SpanishPhoneValidator.allowedInitialNumbers, firstNumber);
    }
}