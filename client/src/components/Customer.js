import { useState } from "react"
import {useNavigate } from "react-router-dom"
import { addCustomer } from "../data/customerData"

export const Customer = () => {
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail]  = useState("")
    const navigate = useNavigate()

    const handleAddCustomerBtn = (event) => {
        event.preventDefault()

        const addACustomer = {
            name: customerName,
            email: customerEmail
        }

        addCustomer(addACustomer).then(() => navigate("/customers"))
        //navigate back to customers after they submit their new customer info,
        //add a form to book an appointment now that they are a new customer
    }
    return (
        <div className="customer">
            <h2>Sign Up to Become a Customer and Book an Appointment With Us!</h2>
            <div className="name">
                Name:
                <input
                type="text"
                onChange={(event) => setCustomerName(event.target.value)} />
            </div>
            <div className="email">
                Email:
                <input
                type="email"
                onChange={(event) => setCustomerEmail(event.target.value)} />
            </div>
            <div>
                <button className="submit" onClick={(event) => handleAddCustomerBtn(event)}>Submit</button>
            </div>
        </div>
    )
}