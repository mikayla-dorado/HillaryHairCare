import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addAppointment, deleteAppointment, getAppointments } from "../data/appointmentData"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])


    const navigate = useNavigate()

    const getandSetAppointments = () => {
        getAppointments().then((array) => setAppointments(array))
    }

    useEffect(() => {
        getandSetAppointments()
    }, [])

    const handleDeleteAppointmentBtn = (event, id) => {
        event.preventDefault()
        deleteAppointment(id).then(() => getandSetAppointments())
    }

    const handleAddAppointmentBtn = (event) => {
        event.preventDefault()
        addAppointment().then(() => getandSetAppointments())

        navigate("/appointments/add")
    }

    return(
        <div>
            <h2>Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Stylist</th>
                        {/* <th>Service</th> */}
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={`appointments-${a?.id}`}>
                            <td>{a?.customer?.name}</td>
                            <td>{a?.stylist?.name}</td>
                            {/* <td>{a?.service?.name}</td> */}
                            <td>{a?.time.slice(0,16)}</td>
                            <td><button onClick={(event) => deleteAppointment(event, a.id)}>Cancel Appointment</button></td>
                            <td><button onClick={(event) => handleAddAppointmentBtn(event)}>Add Appointment</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}