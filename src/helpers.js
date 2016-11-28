export default class Helpers {
    static toCamelCase(str) {
        return str.replace(/^([A-Z])|[\s-_](\w)/g,
            (match, p1, p2, offset) => {
                if (p2) return p2.toUpperCase();
                return p1.toLowerCase();
            });
    }

    static isClass(v) {
        return typeof v === 'function' && /^\s*class\s+/.test(v.toString()) || /_class\S+/i.test(v.toString());
    }
}
