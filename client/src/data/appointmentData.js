import { alignPropType } from "react-bootstrap/esm/types";

const _apiUrl = "/api/appointments";

export const getAppointments = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const getAppointmentsById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const deleteAppointment = (id) => {
    return fetch(`${_apiUrl}/${id}/delete`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }
    })
}

export const addAppointment = (appointmentObj) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(appointmentObj)
    })
}

export const editAppointment = (id) => {
    return fetch(`${_apiUrl}/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        }
    })
}