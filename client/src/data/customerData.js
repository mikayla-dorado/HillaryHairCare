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

export const getCustomers = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}