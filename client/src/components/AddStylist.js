// import { useEffect, useState } from "react"
// import { addStylist } from "../data/stylistData"
// import { useNavigate } from "react-router-dom"

// export const AddStylist = () => {
//   const [stylistName, setStylistName] = useState("")
//   //const [stylistServices, setStylistServices] = useState("")
//   const [serviceId, setServiceId] = useState(0)

//   const navigate = useNavigate()

//   const handleAddStylistBtn = (e) => {
//     e.preventDefault()

//     const stylistAdd = {
//       name: stylistName,
//       active: true,
//       serviceId: serviceId
//     }
//     addStylist(stylistAdd).then(() => navigate("/stylists"))
//   }

//   return (
//     <div className="container">
//       <h4>Add A New Stylist</h4>
//       <div className="form-container">
//         <div>Stylist Name: </div>
//         <input type="text" onChange={e => setStylistName(e.target.value)} />
//       </div>
//       <div className="service">
//         <div>Services Offered</div>
//         <input
//           type="text"
//           onChange={e => setServiceId(e.target.value)} />
//       </div>
//       <button onClick={e => handleAddStylistBtn(e)}>Add Stylist</button>
//     </div>
//   )
// }
import { useEffect, useState } from "react";
import { addStylist } from "../data/stylistData";
import { useNavigate } from "react-router-dom";

export const AddStylist = () => {
  const [stylistName, setStylistName] = useState("");
  const [serviceId, setServiceId] = useState(0);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch or set your services data here
    const availableServices = [
      { id: 1, name: "Highlights" },
      { id: 2, name: "Haircut" },
      { id: 3, name: "Beard Trim" },
      { id: 4, name: "All-Over Color" }
    ];

    setServices(availableServices);
  }, []);

  const handleAddStylistBtn = (e) => {
    e.preventDefault();

    const stylistAdd = {
      name: stylistName,
      active: true,
      serviceId: parseInt(serviceId, 10)
    };

    addStylist(stylistAdd).then(() => navigate("/stylists"));
  };

  return (
    <div className="container">
      <h4>Add A New Stylist</h4>
      <div className="form-container">
        <div>Stylist Name: </div>
        <input type="text" onChange={(e) => setStylistName(e.target.value)} />
      </div>
      <div className="service">
        <div>Services Offered</div>
        <select onChange={(e) => setServiceId(e.target.value)}>
          <option value={0}>Select a Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {`${service.id} - ${service.name}`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={(e) => handleAddStylistBtn(e)}>Add Stylist</button>
    </div>
  );
};
