// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { editAppointment, getAppointments, getAppointmentsById } from "../data/appointmentData"

// export const EditAppointment = () => {
//     const [appointments, setAppointments] = useState([])
//     const [customer, setCustomer] = useState([])
//     const [service, setService] = useState([])
//     const [stylist, setStylist] = useState([])

//     const { id } = useParams()
//     const navigate = useNavigate()

//     const getandSetAppointments = () => {
//         getAppointments().then((array) => setAppointments(array))
//     }

//     useEffect(() => {
//         getandSetAppointments()
//     }, [])

//     useEffect(() => {
//         getAppointmentsById(id).then((data) => setAppointments(data))
//     })

//     const handleEditAppointmentBtn = (event, id) => {
//         event.preventDefault()
//         editAppointment(id).then(() => getandSetAppointments())

//         navigate("/appointments/edit")
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         if (appointments.time && appointments.customerId && appointments.stylistId) {
//             editAppointment(appointments).then(navigate("/appointments"))
//         } else {
//             window.alert("Please continue filling out the form")
//         }
//     }

//     return(
//         <div>
//             <h2>Edit an Appointment</h2>
//             <form>
//                 <p>Customer Name:</p>
//                 <input
//                 type="text"
//                 value={customer?.name}
//                 onChange={e => {
//                     const appointmentCopy = {...appointments}
//                     appointmentCopy.name = e.target.value
//                     setCustomer(appointmentCopy)
//                 }}
//                 />
//             </form>
//         </div>
//     )
// }
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editAppointment, getAppointmentServices, getAppointments, getAppointmentsById } from "../data/appointmentData";
import { getCustomers } from "../data/customerData"
import { getStylists } from "../data/stylistData"

export const EditAppointment = () => {
    const [appointment, setAppointment] = useState({});
    const [services, setServices] = useState([]);
    const [appointmentServices, setAppointmentServices] = useState([])
    const [customers, setCustomers] = useState([]);
    const [stylists, setStylists] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    // const getAndSetAppointments = () => {
    //     getAppointments().then((array) => {
    //         const selectedAppointment = array.find((app) => app.id === parseInt(id));
    //         setAppointment(selectedAppointment);
    //         setServices(selectedAppointment.services || []); // Assuming the appointment object has a 'services' property
    //     });
    // };
    const getAndSetAppointments = () => {
        getAppointments().then((array) => {
            const selectedAppointment = array.find((app) => app.id === parseInt(id));
            console.log("Selected Appointment:", selectedAppointment);
    
            if (selectedAppointment && selectedAppointment.services) {
                console.log("Services:", selectedAppointment.services);
                setServices(selectedAppointment.services.map(serviceId => ({ serviceId })));
            } else {
                setServices([]);
            }
    
            setAppointment(selectedAppointment);
        });
    };


    useEffect(() => {
        getAndSetAppointments();
    }, []);

    const getAndSetCustomers = () => {
        getCustomers().then((data) => setCustomers(data))
    }

    useEffect(() => {
        getAndSetCustomers()
    }, [])

    const getAndSetStylists = () => {
        getStylists().then((data) => setStylists(data))
    }

    useEffect(() => {
        getAndSetStylists()
    }, [])

    useEffect(() => {
        getAppointmentsById(id).then((data) => setAppointment(data));
    }, [id]);

    const getAndSetAppointmentServices = () => {
        getAppointmentServices().then((data) => setAppointmentServices(data))
    }

    useEffect(() => {
        getAndSetAppointmentServices()
    }, [])

    const handleServiceChange = (index, newValue) => {
        const updatedServices = [...services];
        updatedServices[index] = newValue;
        setServices(updatedServices);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (appointment.time && appointment.customerId && appointment.stylistId) {
            const updatedAppointment = { ...appointment, services: services };
            editAppointment(updatedAppointment).then(() => navigate("/appointments"));
        } else {
            window.alert("Please continue filling out the form");
        }
    };

    console.log(services) //services is an empty array
    //selected appointment is undefined

    return (
        <div>
            <h2>Edit an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Customer Name:</p>
                    <select
                        value={appointment?.customerId}
                        onChange={(event) => setAppointment({ ...appointment, customerId: event.target.value })}
                    >
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Stylist Name:</p>
                    <select
                        value={appointment?.stylistId}
                        onChange={(event) => setAppointment({ ...appointment, stylistId: event.target.value })}
                    >
                        {stylists.map((stylist) => (
                            <option key={stylist.id} value={stylist.id}>
                                {stylist?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Services:</p>
                    {services && Array.isArray(services) && services.length > 0 ? (
                        services.map((appointmentService, index) => (
                            <select
                                key={index}
                                value={appointmentService.serviceId}
                                onChange={(event) => handleServiceChange(index, event.target.value)}
                            >
                                {appointmentServices.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service?.name}
                                    </option>
                                ))}
                            </select>
                        ))
                    ) : (
                        <p>No services available</p>
                    )}

                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};
