export class StringExtensions{
    constructor() {
        Object.defineProperty(String, 'toCamelCase', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () =>
            {
                return this.replace(/^([A-Z])|[\s-_](\w)/g,
                (match, p1, p2, offset) => {
                    if (p2) return p2.toUpperCase();
                    return p1.toLowerCase();
                })
            }
        });
    }
    // toCamelCase() {
    //     return this.replace(/^([A-Z])|[\s-_](\w)/g,
    //         (match, p1, p2, offset) => {
    //             if (p2) return p2.toUpperCase();
    //             return p1.toLowerCase();
    //         });
    // }
}