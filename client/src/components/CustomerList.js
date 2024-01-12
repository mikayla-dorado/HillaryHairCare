import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomers } from "../data/customerData"


export const CustomerList = () => {
    const [customers, setCustomers ] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        getCustomers().then(array => setCustomers(array))
    }, [])

    console.log(customers)

    const handleAddCustomerBtn = (event) => {
        event.preventDefault()

        navigate("/customers/add")
    }

    return (
        <div>
            <h4>Customers</h4>
            <button onClick={event => handleAddCustomerBtn(event)}>Add a New Customer</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={`customers-${c?.customer?.id}`}>
                            <td>{c?.customer?.name}</td>
                            <td>{c?.customer?.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}