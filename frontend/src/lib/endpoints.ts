const DEBUG = true

let BASE_URL = null

const DEVELOPMENT_SERVER = 'http://localhost:8000/'

DEBUG ? BASE_URL = DEVELOPMENT_SERVER : BASE_URL = window.location.origin

const createURL = ({ path, query }: { path: string; query?: Record<string, any> }): string => {
    const url = new URL(path, BASE_URL);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    return url.toString();
};

export const endpoints = {
    setCSRFToken: createURL({ path: 'set-csrf-token' }),
    checkSession: createURL({ path: 'check-session' }),
    login: createURL({ path: 'login' })
}