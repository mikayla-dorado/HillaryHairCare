import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editAppointment, getAppointmentServices, getAppointments, getAppointmentsById, getAppointmentServicesByAppointmentId } from "../data/appointmentData";
import { getCustomers } from "../data/customerData"
import { getStylists } from "../data/stylistData"

export const EditAppointment = () => {
    const [appointment, setAppointment] = useState({});
    const [appointmentTime, setAppointmentTime] = useState("")
    const [services, setServices] = useState([]);
    const [appointmentServices, setAppointmentServices] = useState([])
    const [customers, setCustomers] = useState([]);
    const [stylists, setStylists] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();


    const getAndSetAppointments = async () => {
        try {
            const appointmentsArray = await getAppointments();
            const selectedAppointment = appointmentsArray.find((app) => app.id === parseInt(id));
            setAppointmentTime(selectedAppointment.time);

            if (selectedAppointment) {
                // Assuming services are fetched from the AppointmentServices entity
                const appointmentServices = await getAppointmentServicesByAppointmentId(selectedAppointment.id);

                console.log("Appointment Services:", appointmentServices);

                // Map service IDs to an array of objects with serviceId
                const services = appointmentServices.map((service) => ({ serviceId: service.serviceId }));

                setServices(services);
            } else {
                setServices([]);
            }

            setAppointment(selectedAppointment);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
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
        console.log(appointmentServices)
    }

    useEffect(() => {
        getAndSetAppointmentServices()
    }, [])

    const handleServiceCheckboxChange = (serviceId, isChecked) => {
        let updatedServices = [...services];
        if (isChecked) {
            // Add serviceId to services array
            updatedServices.push({ serviceId });
        } else {
            // Remove serviceId from services array
            updatedServices = updatedServices.filter(service => service.serviceId !== serviceId);
        }
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
                    <p>Time:</p>
                    <input
                        type="datetime-local"
                        value={appointment.time}
                        onChange={(event) => {
                            const newTime = new Date(event.target.value)

                            setAppointment({...appointment, time: newTime})
                        }}
                    />
                </div>
                <div>
                    <p>Services:</p>
                    {appointmentServices.map((service, index) => (
                        <div key={service.id}>
                            <input
                                type="checkbox"
                                id={`service-${service.id}`}
                                checked={services.some(s => s.serviceId === service.id)}
                                onChange={(e) => handleServiceCheckboxChange(service.id, e.target.checked)}
                            />
                            <label htmlFor={`service-${service.id}`}>{service.serviceName}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};
