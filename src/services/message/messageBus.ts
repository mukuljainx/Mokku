class MessageBus {
  _defaultListener: (data: any) => void;
  _collector = {};

  constructor() {
    this._defaultListener = console.log;
    this._collector = {};
  }

  dispatch(id: number, eventData: any) {
    if (this._collector[id]) {
      this._collector[id](eventData);
    } else {
      this._defaultListener(eventData);
    }
  }

  addListener(id: number, func: Function) {
    this._collector[id] = func;
  }

  createDefaultListener(func: any) {
    this._defaultListener = func;
  }
}

export default MessageBus;
