const _apiUrl = "/api/stylists";

export const getStylists = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const deactivateStylist = (id) => {
    return fetch(`${_apiUrl}/${id}/deactivate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const addStylist = (stylistObj) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(stylistObj)
    })
}