import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getServices } from "../data/serviceData"
import { getStylists } from "../data/stylistData"
import { getCustomers } from "../data/customerData"
import { addAppointment } from "../data/appointmentData"

//going to need to add time to this functionality
export const AddAppointment = () => {
    const [customers, setCustomers] = useState([])
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])
    const [chosenCustomer, setChosenCustomer] = useState([])
    const [chosenStylist, setChosenStylist] = useState([])
    const [chosenServices, setChosenServices] = useState([])
    const [appointmentDateTime, setAppointmentDateTime] = useState("")
    const [appointmentTime, setAppointmentTime] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getCustomers().then(array => setCustomers(array))
    }, [])

    useEffect(() => {
        getStylists().then(array => setStylists(array))
    }, [])

    useEffect(() => {
        getServices().then(array => setServices(array))
    }, [])

    const handleChangeServices = (event) => {
        const chosenServiceId = parseInt(event.target.value);
        const chosenService = services.find(s => s.id === chosenServiceId);

        if (chosenService) {
            setChosenServices([...chosenServices, chosenService]);
        }
    };

    const handleSubmitBtn = (event) => {
        event.preventDefault()
        const addAppt = {
            customerId: chosenCustomer,
            stylistId: chosenStylist,
            services: chosenServices,
            time: appointmentDateTime
        }
        addAppointment(addAppt).then(() => navigate("/appointments"))
    }

    return (
        <div>
            <h2>Book an Appointment!</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Service</th>
                        <th>Date</th>
                        {/* <th>Time</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select onChange={(event) => {
                                setChosenCustomer(parseInt(event.target.value))
                            }}>
                                <option value="0">Choose a Customer</option>
                                {customers.map(c => {
                                    return (
                                        <option value={c.id} key={c.id}>{c.name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <select onChange={(event) => {
                                setChosenStylist(parseInt(event.target.value))
                            }}>
                                <option value="0">Select a Stylist</option>
                                {stylists.map(s => {
                                    return (
                                        <option value={s?.id} key={s?.id}>{s?.name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <div>
                                <select onChange={handleChangeServices}>
                                    <option value="0">Select a Service</option>
                                    {services.map(s => (
                                        <option value={s?.id} key={s?.id}>{s?.name}</option>
                                    ))}
                                </select>
                            </div>
                            {chosenServices.map((cs, index) => (
                                <div key={index}>
                                    Selected Service: {cs.name}
                                </div>
                            ))}
                        </td>
                        <td>
                            <input
                                type="datetime-local"  // Use datetime-local input type for date and time
                                value={appointmentDateTime}
                                onChange={(event) => setAppointmentDateTime(event.target.value)}
                            />
                        </td>
                        <td>
                            {/* <input
                                type="text"
                                placeholder="HH:MM AM/PM"
                                value={appointmentTime}
                                onChange={(event) => setAppointmentTime(event.target.value)}
                            /> */}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={event => handleSubmitBtn(event)}>Book Appointment</button>
            </div>
        </div>
    )
}