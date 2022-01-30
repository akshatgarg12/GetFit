export const urlParser = (url : string) : string => {
    const idx = url.indexOf("upload") + 6
    const newUrl = url.slice(0,idx) + "/f_auto,q_auto" + url.slice(idx)
    return newUrl
}