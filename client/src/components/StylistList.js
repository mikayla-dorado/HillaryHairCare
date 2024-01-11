import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStylists } from "../data/stylistData"

export const StylistList = () => {
    const [stylists, setStylists] = useState([])
    const navigate = useNavigate()

    const getAndSetStylists = () => {
        getStylists().then(array => setStylists(array))
    }

    useEffect(() => {
        getAndSetStylists()
    }, [])

    return (
        <div>
            <h4>Meet Our Stylists</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Services</th>
                    </tr>
                </thead>
                <tbody>
                    {stylists.map((s) => (
                        <tr key={`stylists-${s?.id}`}>
                            <td>{s?.stylist?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}