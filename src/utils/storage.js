// 获取本地缓存
export const getItem = item => {
    const data = window.localStorage.getItem(item)
    try {
        return JSON.parse(data)
    } catch (e) {
        return data
    }
}

// 向本地存储
export const setItem = (item, value) => {
    if (typeof value === Object) {
        value = JSON.stringify(value)
    }
    localStorage.setItem(item, value)
}
//清除本地储存
export const removeItem = item => {
    window.localStorage.removeItem(item)
}