class EmailValidator{
    static pattern: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    public run = (answer: string): boolean => {
        return EmailValidator.pattern.test(answer);
    };
}