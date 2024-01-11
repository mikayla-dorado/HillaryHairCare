const _apiUrl = "/api/customers";

export const addCustomer = (customerObj) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerObj)
    })
}