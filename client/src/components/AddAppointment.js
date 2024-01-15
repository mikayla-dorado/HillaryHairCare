import { useEffect, useState } from "react"
import { getServices } from "../../data/serviceData"
import { getStylists } from "../../data/stylistData"
import { getCustomers } from "../../data/customerData"

//going to need to add time to this functionality
export const AddAppointment = () => {
    const [customers, setCustomers] = useState([])
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])
    const [chosenCustomer, setChosenCustomer] = useState(0)
    const [chosenStylist, setChosenStylist] = useState(0)
    const [chosenServices, setChosenServices] = useState([])

    useEffect(() => {
        getCustomers().then(array => setCustomers(array))
    }, [])

    useEffect(() => {
        getStylists().then(array => setStylists(array))
    }, [])

    useEffect(() => {
        getServices().then(array => setServices(array))
    }, [])

    return (
        <div>
            <h2>Book an Appointment</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Service</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <select onChange={(event) => {
                            setChosenCustomer(parseInt(event.target.value))
                        }}>
                            <option value="0">Choose a Customer</option>
                            {customers.map(c => {
                                return (
                                    <option value={c.customer.id} key={c.customer.id}>{c.customer.name}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        <select onChange={(event) => {
                            setChosenStylist(parseInt(event.target.value))
                        }}>
                            <option value="0">Choose a Stylist</option>
                            {stylists.map(s => {
                                return (
                                    <option value={s.stylist.id} key={s.stylist.id}>{s.stylist.name}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        {/* need to add services here */}
                    </td>
                </tbody>
            </table>
        </div>
    )
}