class Setter implements IAction {
    parent: SetterFactory;
    key: string;
    value: number;

    constructor(parent: SetterFactory, key: string, value: any) {
        this.parent = parent;
        this.key = key;
        this.value = value;
    }
    
    run = () => {
        this.parent.set(this.key, this.value);
    }
}