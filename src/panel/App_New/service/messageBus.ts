class MessageBus {
  _defaultListner: (data: any) => void;
  _collector = {};
  constructor() {
    this._defaultListner = console.log;
    this._collector = {};
  }

  dispatch(id: number, eventData: any) {
    if (this._collector[id]) {
      this._collector[id](eventData);
    } else {
      this._defaultListner(eventData);
    }
  }

  addLister(id: number, func: any) {
    this._collector[id] = func;
  }

  createDefaultListener(func: any) {
    this._defaultListner = func;
  }
}

export default MessageBus;
