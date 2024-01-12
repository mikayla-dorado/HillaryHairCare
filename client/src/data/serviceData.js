const _apiUrl = "/api/services";

export const getServices = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const addService = (serviceObj) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serviceObj)
    })
}