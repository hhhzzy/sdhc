
const key = 'hzy_admin'

export const getToken = () => {
    return localStorage.getItem(key)
}

export const setToken = (data) => {
    return localStorage.setItem(key, data)
}

export const removeToken = () => {
    return localStorage.removeItem(key)
}
