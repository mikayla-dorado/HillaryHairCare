import { useEffect, useState } from "react"
import { addStylist } from "../data/stylistData"
import { useNavigate } from "react-router-dom"

export const AddStylist = () => {
  const [stylistName, setStylistName] = useState("")
  const [stylistServices, setStylistServices] = useState("")

  const navigate = useNavigate()

  const handleAddStylistBtn = (e) => {
    e.preventDefault()

    const stylistAdd = {
      name: stylistName, active: true
    }
    addStylist(stylistAdd).then(() => navigate("/stylists"))
  }

  return (
    <div className="container">
      <h4>Add A New Stylist</h4>
      <div className="form-container">
        <div>Stylist Name: </div>
        <input type="text" onChange={e => setStylistName(e.target.value)}/>
      </div>
      <div className="service">
        <div>Services Offered</div>
        <input
        type="text"
        onChange={event => setStylistServices(event.target.value)} />
      </div>
      <button onClick={e => handleAddStylistBtn(e)}>Add Stylist</button>
    </div>
  )
}