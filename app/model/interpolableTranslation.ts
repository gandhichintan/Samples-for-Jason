class InterpolableTranslation implements IInterpolableTranslation {
    constructor(public key: string = "", private _interpolations = {}) { }

    get interpolations(): any {
        return this._interpolations;
    }

    set interpolations(interpolations) {
        this._interpolations = interpolations;
    }
}