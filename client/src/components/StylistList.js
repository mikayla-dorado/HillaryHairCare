import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStylists, deactivateStylist } from "../data/stylistData"
import { getServices } from "../data/serviceData"

export const StylistList = () => {
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])
   
    const navigate = useNavigate()

    const getAndSetStylists = () => {
        getStylists().then(array => setStylists(array))
    }

    useEffect(() => {
        getAndSetStylists()
    }, [])

    const getAndSetServices = () => {
        getServices().then(array => setServices(array))
    }

    useEffect(() => {
        getAndSetServices()
    }, [])


    //need to add functionality in data and program.cs
    const handleAddStylistBtn = (event) => {
        event.preventDefault()

        navigate("/stylists/add")
    }

    const handleDeactivateStylistBtn = (event, id) => {
        event.preventDefault()
        console.log(id)
        console.log(typeof (id))
        deactivateStylist(id).then(() => getAndSetStylists())
    }

    return (
        <div>
            <div>
                <button onClick={event => handleAddStylistBtn(event)}>Add a Stylist</button>
            </div>
            <h2 className="stylist">Meet Our Stylists</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Services Provided</th>
                        <th>Active Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stylists.map((stylist) => (
                        <tr key={`stylists-${stylist?.id}`}>
                            <th scope="row">{stylist.id}</th>
                            <td>{stylist?.name}</td>
                            <td>
                                {services
                                    .filter((service) => service.id === stylist.serviceId)
                                    .map((service) => (
                                        <span key={`service-${service.id}`}>{service.name}</span>
                                    ))}
                            </td>
                            <td>
                            {stylist.active ? (
                                <button onClick={(event) => handleDeactivateStylistBtn(event, stylist.id)}>Remove Stylist</button>
                            ) : (
                                "N/A"
                            )
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
