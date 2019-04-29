
export class Contract<T> {
    constructor(data?: T) {
        Object.entries(data).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}
