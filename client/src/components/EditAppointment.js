// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { editAppointment, getAppointments, getAppointmentsById } from "../data/appointmentData"

// export const EditAppointment = () => {
//     const [appointments, setAppointments] = useState([])

//     const { id } = useParams()
//     const navigate = useNavigate()

//     const getandSetAppointments = () => {
//         getAppointments().then((array) => setAppointments(array))
//     }

//     useEffect(() => {
//         getandSetAppointments()
//     }, [])

//     useEffect(() => {
//         getAppointmentsById(id).then((data) => setAppointments(data))
//     })

//     const handleEditAppointmentBtn = (event, id) => {
//         event.preventDefault()
//         editAppointment(id).then(() => getandSetAppointments())

//         navigate("/appointments/edit")
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         if (appointments.time && appointments.customerId && appointments.stylistId) {
//             editAppointment(appointments).then(navigate("/appointments"))
//         } else {
//             window.alert("Please continue filling out the form")
//         }
//     }

//     return(
//         <div>
//             <h2>Edit an Appointment</h2>
//             <form>
//                 <p>Customer Name:</p>
//                 <input
//                 type="text"
//                 value={customer?.name}
//                 onChange={e => {
//                     const appointmentCopy = {...appointment}
//                     appointmentCopy.name = e.target.value
//                     setCustomer(appointmentCopy)
//                 }}
//                 />
//             </form>
//         </div>
//     )
// }