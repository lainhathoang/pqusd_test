import { deleteCookie, getCookie } from "./CookieStorage";

export function saveLocalData (name: string, data: any) {
    const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
    if (window?.localStorage) {
        window.localStorage.setItem(name, savedData);
    } else {
        if (savedData.length <= 512) {
            document.cookie = `${name}=${savedData}`
        }
    }
}

export function getLocalData (name: string) {
    const data = window?.localStorage ? window.localStorage.getItem(name) : getCookie(name);

    try {
        JSON.parse(data!);
    } catch (_error) {
        return data
    }

}

export function removeLocalData (name: string) {
    if (window?.localStorage) {
        window.localStorage.removeItem(name);
    } else {
        deleteCookie(name);
    }
}