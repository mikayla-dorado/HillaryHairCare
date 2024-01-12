import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addService  } from "../data/serviceData"


export const AddService = () => {
    const [serviceName, setServiceName] = useState("")
    const [servicePrice, setServicePrice] = useState(0)

    const navigate = useNavigate()

    const handleAddServiceBtn = (event) => {
        event.preventDefault()

        const addAService = {
            name: serviceName,
            price: servicePrice
        }

        addService(addAService).then(() => navigate("/services"))
    }

    return (
        <div>
            <h2>Add a Service</h2>
            <div>
                Name:
                <input
                type="text"
                onChange={(event) => setServiceName(event.target.value)} />
            </div>
            <div>
                Price:
                <input
                type="number"
                onChange={(event) => setServicePrice(Number(event.target.value))} />
            </div>
            <div>
                <button onClick={(event) => handleAddServiceBtn(event)}>Submit</button>
            </div>
        </div>
    )
}