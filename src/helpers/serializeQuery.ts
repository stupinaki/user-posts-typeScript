
export function serializeQuery(obj: Record<string, string | number> = {}): string {
    const arr = [];
    for (const parameter in obj)
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(parameter)) {
            arr.push(encodeURIComponent(parameter) + "=" + encodeURIComponent(obj[parameter]));
        }
    return arr.join("&");
}