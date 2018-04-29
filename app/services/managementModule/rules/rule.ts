abstract class Rule implements IEvaluable {
    question: Question;
    constant: any;

    getValue = (): boolean => true;
}