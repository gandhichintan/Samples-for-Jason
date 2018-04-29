abstract class Operator implements IEvaluable {
    members: IEvaluable[];

    abstract getValue(): boolean;
}