class IdFactory {
  private _id: number;
  constructor() {
    this._id = 0;
  }

  getId() {
    this._id++;
    return this._id;
  }
}

export default IdFactory;
