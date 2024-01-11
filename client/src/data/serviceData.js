const _apiUrl = "/api/services";

export const getServices = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}