import { getLocalData, removeLocalData, saveLocalData } from "./LocalStorage";
import { getSessionData, removeSessionData, saveSessionData } from "./SessionStorage";

const ACCESS_TOKEN = ''
const REFRESH_TOKEN = ''


export function saveToken ({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }, onlySession: boolean = false) {
    if (onlySession) {
        saveSessionData(ACCESS_TOKEN, accessToken)
        saveSessionData(REFRESH_TOKEN, refreshToken)
    } else {
        saveLocalData(ACCESS_TOKEN, accessToken)
        saveLocalData(REFRESH_TOKEN, refreshToken)
    }
}

export function getAccessToken () {
    return getLocalData(ACCESS_TOKEN) || getSessionData(ACCESS_TOKEN)
}

export function getRefreshToken () {
    return getLocalData(REFRESH_TOKEN) || getSessionData(REFRESH_TOKEN)
}

export function removeToken () {
    removeLocalData(ACCESS_TOKEN)
    removeLocalData(REFRESH_TOKEN)
    removeSessionData(ACCESS_TOKEN)
    removeSessionData(REFRESH_TOKEN)
}