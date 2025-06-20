class IdFactory {
    private _id: number;
    constructor() {
        this._id = 0;
    }

    getId() {
        // skip 0, as it can lead to falsy
        this._id++;
        return this._id;
    }
}

export default IdFactory;
