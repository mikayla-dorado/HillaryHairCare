import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddCustomer } from './components/AddCustomer'
import { StylistList } from './components/StylistList';
import { AddStylist } from './components/AddStylist'
import { CustomerList } from './components/CustomerList';
import { ServiceList } from './components/ServiceList';
import { AddService } from './components/AddService';
import { AppointmentList } from './components/AppointmentList';
import { AddAppointment } from './components/AddAppointment';
import { EditAppointment } from "./components/EditAppointment"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/customers'>
          <Route index element={<CustomerList />} />
          <Route path='add' element={<AddCustomer />} />
        </Route>
        <Route path='stylists'>
          <Route index element={<StylistList />} />
          <Route path='add' element={<AddStylist />} />
        </Route>
        <Route path='services'>
          <Route index element={<ServiceList />} />
          <Route path='add' element={<AddService />} />
        </Route>
        <Route path='appointments'>
          <Route index element={<AppointmentList />} />
          <Route path='add' element={<AddAppointment />} />
          <Route path='edit/:id' element={<EditAppointment />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
