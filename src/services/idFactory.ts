class IdFactory {
  private _id: number;
  constructor() {
    this._id = -1;
  }

  getId() {
    this._id++;
    return this._id;
  }
}

export default IdFactory;
