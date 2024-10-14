import { deleteCookie, getCookie } from "./CookieStorage";

export function saveSessionData (name: string, data: any) {
    const savedData = typeof data === 'string' ? data : JSON.stringify(data);

    if (window && window.sessionStorage) {
        window.sessionStorage.setItem(name, savedData);
    } else {
        if (savedData?.length <= 512) {
            document.cookie = `${name}=${savedData}`
        }
    }
}

export function getSessionData (name: string) {
    const data = window?.sessionStorage ? window.sessionStorage.getItem(name) : getCookie(name)
    try {
        return JSON.parse(data!)
    } catch (error) {
        return data
    }
}

export function removeSessionData (name: string) {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem(name);
    } else {
        deleteCookie(name);
    }

}