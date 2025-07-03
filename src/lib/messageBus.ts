export class MessageBus {
    _defaultListner: (data: any) => void;
    _collector: Record<number, (args: unknown) => unknown> = {};
    constructor() {
        this._defaultListner = () => {};
        this._collector = {};
    }

    dispatch(id: number, eventData: any) {
        if (this._collector[id]) {
            this._collector[id](eventData);
            delete this._collector[id];
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
