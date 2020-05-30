class MessageBus {
  _defaultListner: (data: any) => void;
  _collector = {};

  dispatch(id, eventData) {
    if (this._collector[id]) {
      this._collector[id](eventData);
    } else {
      this._defaultListner(eventData);
    }
  }

  addLister(id, func) {
    this._collector[id] = func;
  }

  createDefaultListener(func) {
    this._defaultListner = func;
  }
}

export default MessageBus;
