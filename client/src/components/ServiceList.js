import { useEffect, useState } from "react"
import { getServices, addService } from "../data/serviceData"
import { useNavigate } from "react-router-dom"


export const ServiceList = () => {
    const [services, setServices] = useState([])

    const navigate = useNavigate()

    const getAndSetServices = () => {
        getServices().then(array => setServices(array))
    }

    useEffect(() => {
        getAndSetServices()
    }, [])

    const handleAddServiceBtn = (event) => {
        event.preventDefault()
        addService().then(() => getAndSetServices())
        navigate("/services/add")
    }


    return (
        <div>
            <h2>Services</h2>
            <button onClick={(event) => handleAddServiceBtn(event)}>Add a Service</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((s) => (
                        <tr key={`services-${s?.id}`}>
                            <td>{s?.name}</td>
                            <td>{s?.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}