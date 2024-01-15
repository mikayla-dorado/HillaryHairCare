import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addAppointment, deleteAppointment, editAppointment, getAppointments, getAppointmentsById } from "../data/appointmentData"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])

    const navigate = useNavigate()

    const getandSetAppointments = () => {
        getAppointments().then((array) => setAppointments(array))
    }

    useEffect(() => {
        getandSetAppointments()
    }, [])
    
    const handleEditAppointmentBtn = (event, id) => {
        event.preventDefault()
        editAppointment(id).then(() => getandSetAppointments())

        navigate("/appointments/edit")
    }

    const handleDeleteAppointmentBtn = (event, id) => {
        event.preventDefault()
        deleteAppointment(id).then(() => getandSetAppointments())
    }

    const handleAddAppointmentBtn = (event) => {
        event.preventDefault()
        addAppointment().then(() => getandSetAppointments())

        navigate("/appointments/add")
    }

    const formatDateTime = (dateTimeString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //second: 'numeric',
            timeZoneName: 'short'
        };

        const formattedDateTime = new Date(dateTimeString).toLocaleDateString(undefined, options);
        return formattedDateTime;
    };

    return(
        <div>
            <h2>Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Time</th>
                        <td><button onClick={(event) => handleAddAppointmentBtn(event)}>Add Appointment</button></td>
                        <td><button onClick={(event) => handleEditAppointmentBtn(event)}>Edit Appointment</button></td>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={`appointments-${a?.id}`}>
                            <td>{a?.customer?.name}</td>
                            <td>{a?.stylist?.name}</td>
                            <td>{formatDateTime(a?.time)}</td>
                            <td><button onClick={(event) => handleDeleteAppointmentBtn(event, a.id)}>Cancel Appointment</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}